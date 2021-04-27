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
import {FileServiceService} from '../../fileService/file-service.service';
import {HomeService} from "../../home/home.service";
@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  optionHolder = [];
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  myDate = new Date();
  currentDate  = this.myDate.getFullYear() + '-' + this.myDate.getMonth() + '-' +  this.myDate.getDate() + '-' +this.myDate.getHours() + '-' + this.myDate.getMinutes();
  value = 'https://assetfront.com';
  constructor(public tcr: TcrService,
              private router: Router,
              private formBuilder: FormBuilder,
              public pdf: PDFService ,
              private vehicleservice: VehiclesService,
              public request: ApiRequestService,
              public idt: InputDataTransferService,
              public dialog: MatDialog,
              private fileService: FileServiceService,
              private home: HomeService
  )
  {
    this.idt.value =  this.vehicleservice.getSerNo();
    this.home.setCommonPreFixes('TCR');
  }

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
    this.home.setCommonPreFixes('TCR');

    let commonPrefix = this.home.getCommonPrefix();
    commonPrefix = commonPrefix + 1;

    const resourceId =  this.request.assetDetails[0].resourceId;
    const contentType = 'json';



    const params = {
      Bucket: 'asset-repair/' + resourceId + '/' + 'TCR' + '/' + commonPrefix,
      Key: 'Tcr.json',
      Body:  JSON.stringify(this.tcr.getTcr()),
      ACL: 'public-read',
      ContentType: contentType
    };

    this.fileService.getS3Bucket().upload(params, (err, data) => {
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

  calltcr(){

    const person = this.registerForm.value;
    const file = this.pdf.PlaceForm(this.tcr.getTcr().tcr, person.workshop, person.fName + ' '
      + person.lName, person.date.toLocaleDateString(), person.email, person.phoneNo);
    return file;

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
        this.pdf.Save(this.idt.value);
      }else {
       this.toSearch();
     }
   });
  }
  toSearch() {
    console.log('to search component...');
    this.router.navigate(['../search']);
  }


  UploadGeneratedPDF() {
    this.home.setCommonPreFixes('TCR');

    let commonPrefix = this.home.getCommonPrefix();
    commonPrefix = commonPrefix + 1;
    this.initIdt();
    // calling Inspection PDF and saving it in a variable:
    const file = this.calltcr();
    const resourceId =  this.request.assetDetails[0].resourceId;
    const fileName = this.currentDate + '-Entire-report.pdf';
    const contentType = 'application/pdf';
    const params = {
      Bucket: 'asset-repair/' + resourceId + '/' + 'TCR' +'/'+commonPrefix,
      Key: fileName,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };

    this.fileService.upload(params);


  }
  initIdt(){
    this.idt.date = this.registerForm.value.date.toLocaleDateString();
    this.idt.company = this.registerForm.value.workshop;
    this.idt.fName = this.registerForm.value.fName;
    this.idt.lName = this.registerForm.value.lName;
    this.idt.Email = this.registerForm.value.email;
    this.idt.phone = this.registerForm.value.phone;
    this.idt.value =  this.vehicleservice.getSerNo();
  }


}
