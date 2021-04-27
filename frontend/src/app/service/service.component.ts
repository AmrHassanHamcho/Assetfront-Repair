import {AfterViewInit, Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FileServiceService} from '../fileService/file-service.service';
import {ApiRequestService} from '../API-request/api-request.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InputDataTransferService} from '../ inputDataTransfer/input-data-transfer.service';
import {PDFService} from '../PDF/pdf.service';
import {VehiclesService} from '../../vehicle-service/vehicle.service';
import { DatePipe } from '@angular/common';
import {HomeService} from '../home/home.service';



@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  providers: [DatePipe]
})
export class ServiceComponent implements OnInit {

  /**
   * A list that holds the files selected by the user
   */
  private selFiles: FileList;

  /**
   * String variable to hold the fileName
   */
  private fileName = '';
  private extension = '';
   myDate = new Date();
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
    cost: [''],

  });

  private files: any;
  private counter = 0;
  currentDate  = this.myDate.getFullYear() + '-'
    + this.myDate.getMonth() + '-' +
    this.myDate.getDate()
    + '-' + this.myDate.getHours() + '-'
    + this.myDate.getMinutes();


  constructor(

    private http: HttpClient,
    public fileService: FileServiceService,
    public apiRequest: ApiRequestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public idt: InputDataTransferService,
    private service: VehiclesService,
    private pdf: PDFService,
    private home: HomeService,
    ){
    this.idt.value = service.getSerNo();
    this.myDate.toLocaleDateString();
    this.validateResourceId();
  }


  ngOnInit(): void {
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


    this.home.setCommonPreFixes('Service');


    let commonPrefix = this.home.getCommonPrefix();
    console.log('CommonPrefix upload = ' + commonPrefix);
    commonPrefix = commonPrefix + 1;
    const resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
    if (this.selFiles !== undefined && this.selFiles !== null){
      let file;
      let contentType;
      let fileName;
      for (let index = 0 ; index <= this.counter; index ++){

       file = this.selFiles.item(index);
       contentType = file.type;
       fileName =  this.currentDate + file.name;
       const params = {

          Bucket: 'asset-repair/' + resourceId + '/' + 'Service' + '/' + commonPrefix,
          Key:  fileName,
          Body: file,
          ACL: 'public-read',
          ContentType: file.type
        };
       this.fileService.upload(params);
     }
      this.onRouteSubmit();

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
      if (result){
        this.pdf.Save(this.idt.value);
      }
    });


    ////// Send data over////
    this.idt.date = this.registerForm.value.date.toLocaleDateString();
    this.idt.hours = this.registerForm.value.hours;
    this.idt.cost = this.registerForm.value.cost;
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


  UploadGeneratedPDF() {
    this.home.setCommonPreFixes('Service');

    let commonPrefix = this.home.getCommonPrefix();
    commonPrefix = commonPrefix + 1;

    this.initIdt();
    // const fileName = this.pdf.DateToday(this.service.getSerNo());
    const fileName = this.currentDate + '-Entire-report.pdf';
    // calling Inspection PDF and saving it in a variable:
    const file = this.pdf.Service(this.idt.company, this.idt.fName + ` ` + this.idt.lName,
      this.idt.date, this.idt.hours, this.idt.cost, this.idt.comment, this.idt.Email, this.idt.phone);

    const resourceId =  this.apiRequest.assetDetails[0].resourceId;
    const contentType = 'application/pdf';
    const params = {
      Bucket: 'asset-repair/' + resourceId + '/' + 'Service' + '/' + commonPrefix,
      Key: fileName,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };

    this.fileService.upload(params);
    this.onRouteSubmit();



  }
  initIdt(){
    this.idt.date = this.registerForm.value.date.toLocaleDateString();
    this.idt.inspectionState = this.registerForm.value.inspectionStates?.viewValue;
    this.idt.company = this.registerForm.value.company;
    this.idt.fName = this.registerForm.value.fName;
    this.idt.lName = this.registerForm.value.lName;
    this.idt.Email = this.registerForm.value.Email;
    this.idt.phone = this.registerForm.value.phone;
    this.idt.comment = this.registerForm.value.comment;
    this.idt.cost = this.registerForm.value.cost;
    this.idt.hours = this.registerForm.value.hours;
    this.idt.value =  this.service.getSerNo();
  }

  validateResourceId(){
    if (this.apiRequest.getAssetDetails().length > 0){
      this.home.setCommonPreFixes('Service');
    }
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


