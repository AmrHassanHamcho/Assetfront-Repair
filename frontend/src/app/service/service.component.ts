import { Component, OnInit } from '@angular/core';

import {HttpClient, HttpClientModule} from "@angular/common/http";
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {FileServiceService} from "../fileService/file-service.service";
import {ApiRequestService} from "../API-request/api-request.service";

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],

})
export class ServiceComponent implements OnInit {

  form: FormGroup;
  formSubmitted = false;

  selFiles : FileList;
  comment = '';
  hours = '';
  coast = '';
  date = '';
  name = '';
  email = '';
  phone='';
  company = '';




  private files: any;
  private counter = 0;
  private contentType = '';



  constructor(
    private http:HttpClient,
    public fileService:FileServiceService,
    private apiRequest: ApiRequestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router : Router){ }


  ngOnInit(): void {
    this.buildForm();
  }



  onUpdateHours(event: Event)
  {
    this.hours = (<HTMLInputElement>event.target).value;
  }

  onUpdateComment(event: Event)
  {
    this.comment = (<HTMLInputElement>event.target).value;
  }

  onUpdateCoast(event: Event)
  {
    this.coast = (<HTMLInputElement>event.target).value;
  }

  onUpdateDate(event: Event)
  {
    this.date = (<HTMLInputElement>event.target).value;
  }
  onUpdateName(event: Event)
  {
    this.name = (<HTMLInputElement>event.target).value;
  }
  onUpdateEmail(event: Event)
  {
    this.email = (<HTMLInputElement>event.target).value;
  }
  onUpdatePhone(event: Event)
  {
    this.phone = (<HTMLInputElement>event.target).value;
  }
  onUpdateCompany(event: Event)
  {
    this.company = (<HTMLInputElement>event.target).value;
  }

/////////////////////////////////////////////////////////////////////////////////////
// File Upload //

  selectFile(event)
  {
    this.selFiles = event.target.files;
    this.counter = this.selFiles.length;
    var fileName =  (<HTMLInputElement>event.target).value;
    var extension = fileName.substr(fileName.lastIndexOf('.'));
    console.log(extension);

    if ((extension!= '.pdf' && extension != '.png' && extension != '.jpeg'))
    {
      alert("Could not allow to upload " + extension);
      this.selFiles = null;
    }


  }
  upload() {

     for (let index =0; index <=this.counter; index ++){

      const file = this.selFiles.item(index);
      console.log(file.type);
      this.contentType = file.type;
      this.name = file.name;
     this.fileService.uploadFile(file, 'Service', this.apiRequest.assetDetails[0].resourceId);
     }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      hours: [null, [Validators.required]],
      coast: [null, [Validators.required]],
      date: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],


    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.formSubmitted = true;

    if (this.form.valid) {
      console.log(this.form.value); // Process your form
    }
  }

  onRouteSubmit() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  onBackSubmit(){

    this.router.navigate(['../home']);
  }
}


@Component({
  selector: 'app-service',
  templateUrl: 'dialog-content-dialog.html',
  styleUrls: ['./dialog-content-dialog.scss'],
  providers: [ServiceComponent],
})
export class DialogContentExampleDialog {
  constructor( public service: ServiceComponent ) {
  }
}
