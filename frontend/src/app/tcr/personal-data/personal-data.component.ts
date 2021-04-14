import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../../vehicle-service/vehicle.service';
import {ApiRequestService} from '../../API-request/api-request.service';
import {TcrService} from '../tcr.service';
import {PDFService} from '../../PDF/pdf.service';
import {Router} from '@angular/router';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import {InputDataTransferService} from '../../ inputDataTransfer/input-data-transfer.service';
import {MatDialog} from '@angular/material/dialog';
import {TcrDialogComponent} from '../tcr-dialog/tcr-dialog.component';
@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  optionHolder = [];
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://assetfront.com';
  constructor(public tcr: TcrService,
              private router: Router,
              private formBuilder: FormBuilder,
              public pdf: PDFService ,
              private vehicleservice: VehiclesService,
              public request: ApiRequestService,
              public idt: InputDataTransferService,
              public dialog: MatDialog)
  {this.idt.value =  this.vehicleservice.getSerNo(); }
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
    phoneNo: [''],
  });

  ngOnInit(): void {
  }

  upload() {
    const test = this.registerForm.value;
    // (test.workshop, test.fName + ' ' + test.lName, test.date)
    console.log('First Name: ' + test.fName);
    console.log('Last Name: ' + test.lName);
    console.log('workshop Name: ' + test.workshop);
    console.log('Email: ' + test.email);
    console.log('DATE in dd/mm/yyyy: ' + test.date.toLocaleDateString());

    const contentType = 'json';
    const FOLDER = 'TCR';
    const file = 'tcr.json';
   /* const bucket = new S3(
      {
        accessKeyId: 'AKIAXTNQB7H3IMBOMEGL',
        secretAccessKey: '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',
        region: 'eu-north-1'
      }
    );*/

    const bucket = new S3(
      {
        accessKeyId: 'AKIA3MSMUCO2MSPHGAKV',
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

  backToTcr() {
    this.router.navigate(['/tcr']);
  }

  calltcr() {
    const person = this.registerForm.value;
    this.pdf.PlaceForm(this.tcr.getTcr().tcr, person.workshop, person.fName + ' '
      + person.lName, person.date.toLocaleDateString(), person.email, person.phoneNo, this.vehicleservice.getSerNo());
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  success() {
    const dialogref =  this.dialog.open(TcrDialogComponent);
    dialogref.afterClosed().subscribe(result => {
     if (result){
        this.calltcr();
      }else {
       this.toSearch();
     }
   });
  }
  toSearch() {
    console.log('to search component...');
    this.router.navigate(['../search']);
  }

}
