import {AfterViewInit, Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {FileServiceService} from '../fileService/file-service.service';
import {ApiRequestService} from '../API-request/api-request.service';

import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InputDataTransferService} from '../ inputDataTransfer/input-data-transfer.service';
import {daLocale} from 'ngx-bootstrap/chronos';
import {PDFService} from '../PDF/pdf.service';
import {VehiclesService} from '../../vehicle-service/vehicle.service';



@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],


})
export class ServiceComponent implements OnInit {

  form: FormGroup;
  selFiles: FileList;
  fileName = '';
  extension = '';
  value;



  Email = new FormControl('', [Validators.required, Validators.email]);

  registerForm = this.formBuilder.group({
    workshop: [''],
    Email: ['', { validators: [Validators.required, Validators.email]}],
    fName: [''],
    lName: [''],
    date: [''],
    hours: [''],
    comment: [''],
    company: [''],
    phone: [''],
    coast: [''],

  });




  private files: any;
  private counter = 0;


  constructor(

    private http: HttpClient,
    public fileService: FileServiceService,
    private apiRequest: ApiRequestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public idt: InputDataTransferService,
    private service: VehiclesService
    ){

  }


  ngOnInit(): void {
   // this.buildForm();
  }




  getErrorMessage(){
    if (this.Email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.Email.hasError('email') ? 'Not a valid email' : '';
  }










  selectFile(event)
  {
    this.selFiles = event.target.files;
    this.counter = this.selFiles.length;

    for (let index = 0; index < this.counter ; index++){
           this.fileName =  this.selFiles.item(index).name;
           this.extension = this.selFiles.item(index).type;
           console.log(this.extension);

           if ((this.extension !== 'application/pdf' && this.extension !== 'image/png' && this.extension !== 'image/jpeg'))
           {
            alert('Could not allow to upload ' + this.extension);
            this.selFiles = null;
            break;
          }

    }
    console.log(this.selFiles);

  }
  upload() {

    if (this.selFiles !== undefined && this.selFiles !== null){
      let file;
      let contentType;
      let name;
      for (let index = 0 ; index <= this.counter; index ++){

       file = this.selFiles.item(index);
       contentType = file.type;
       name = file.name;
       this.fileService.uploadFile(file, 'Service', this.apiRequest.assetDetails[0].resourceId);
       this.onRouteSubmit();
     }
    }
    else{
       alert('No files uploaded!');
       this.onRouteSubmit();
     }



  }

  onRouteSubmit() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    ////// Send data over////
    this.idt.date = this.registerForm.value.date.toLocaleDateString();
    this.idt.hours = this.registerForm.value.hours;
    this.idt.coast = this.registerForm.value.coast;
    this.idt.comment = this.registerForm.value.comment;
    this.idt.company = this.registerForm.value.company;
    this.idt.fName = this.registerForm.value.fName;
    this.idt.lName = this.registerForm.value.lName;
    this.idt.Email = this.registerForm.value.Email;
    this.idt.phone = this.registerForm.value.phone;

    this.idt.value = this.service.getSerNo();
  }

  onBackSubmit(){
    this.router.navigate(['../home']);
  }
}

//////////////////////////////////////////// DIALOG

@Component({
  selector: 'app-service',
  templateUrl: 'dialog-content-dialog.html',
  styleUrls: ['./dialog-content-dialog.scss'],
//  providers: [ServiceComponent],
})


export class DialogContentExampleDialog {
  constructor(public idf: InputDataTransferService) {
  }
}
