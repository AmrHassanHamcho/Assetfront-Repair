import { Component, OnInit } from '@angular/core';
import {ApiRequestService} from '../../API-request/api-request.service';
import {TcrService} from '../tcr.service';
import {Router} from '@angular/router';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PDFService} from '../../PDF/pdf.service';
@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  constructor(public requset: ApiRequestService,
              public tcr: TcrService,
              private router: Router,
              private formBuilder: FormBuilder,
              public pdf: PDFService) {
  }
  optionHolder = [];
  picker: Date;
  lName: string;
  fName: string;
  workshop: string;
  email = new FormControl('', [Validators.required, Validators.email]);

  registerForm = this.formBuilder.group({
    workshop: [''],
    email: ['', {
      validators: [Validators.required, Validators.email],
    }],
    fName: [''],
    lName: [''],
    date: [''],
  });

 /* submitForm() {
return this.registerForm;
  }*/
  color = 'Green';

  ngOnInit(): void {
  }

  upload() {
    const test = this.registerForm.value;
    console.log('First Name: ' + test.fName);
    console.log('Last Name: ' + test.lName);
    console.log('workshop Name: ' + test.workshop);
    console.log('Email: ' + test.email);
    console.log('DATE in dd/mm/yyyy: ' + test.date.toLocaleDateString());

    const contentType = 'json';
    const FOLDER = 'TCR';
    const file = 'tcr.json';
    const bucket = new S3(
      {
        accessKeyId: 'AKIAXTNQB7H3IMBOMEGL',
        secretAccessKey: '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',
        region: 'eu-north-1'
      }
    );
    const params = {
      Bucket: 'json-file/' + this.tcr.getTcr().resourceId + '/' + FOLDER,
      Key: file,
      Body: JSON.stringify(this.tcr.getTcr()),
      ACL: 'public-read',
      ContentType: contentType
    };

    bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

  BackToTcr() {
    this.router.navigate(['/tcr']);
  }

  generatePdf() {
   for( const tcri in this.tcr.getTcr().tcr){
     for(const cpi in this.tcr.getTcr().tcr[tcri].checkpoint){
       for (const opi in this.tcr.getTcr().tcr[tcri].checkpoint[cpi].options){
        // console.log(this.tcr.getTcr().tcr[tcri].checkpoint[cpi].options[opi].description);
         this.optionHolder[opi] = this.tcr.getTcr().tcr[tcri].checkpoint[cpi].options[opi].description;
       }
     }
   }
   console.log(this.optionHolder);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
