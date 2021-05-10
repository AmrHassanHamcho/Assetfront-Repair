import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileServiceService} from '../fileService/file-service.service';
import {ApiRequestService} from '../API-request/api-request.service';
import { FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {InputDataTransferService} from '../ inputDataTransfer/input-data-transfer.service';
import {PDFService} from '../PDF/pdf.service';
import {VehiclesService} from '../vehicle-service/vehicle.service';
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
  /**
   * String variable to hold the file extension
   */
  private extension = '';
  /**
   *   Date object
   */
  myDate = new Date();

  Email = new FormControl('', [Validators.required, Validators.email]);

  /**
   *  Form
   */registerForm = this.formBuilder.group({
    workshop: [''],
    Email: ['', { validators: [Validators.required, Validators.email]}],
    firstName: [''],
    lastName: [''],
    date: [''],
    hours: [''],
    comment: [''],
    company: [''],
    phone: [''],
    cost: [''],

  });

  /**
   *  Targeted file from $event
   */
  private files: any;


   /**
   *  Counter of files targeted
   */
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

   /**
    * Function for displaying an error msg in case of invalid email format
    * @return returns a 'Not a valid email' in case of mistype, or 'must enter a value' in case of empty field.
    */
  getErrorMessage(){
    if (this.Email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.Email.hasError('email') ? 'Not a valid email' : '';
  }
    /**
     * Takes in file/s from user and put into selFiles[] array
     * @param event - To get the user input from $event object
     */
  selectFile(event)  {
    this.selFiles = event.target.files;
    this.counter = this.selFiles.length;
    // loop through the selected files
    for (let index = 0; index < this.counter ; index++){
           this.fileName =  this.selFiles.item(index).name;
           this.extension = this.selFiles.item(index).type;
           console.log(this.extension);
           // Reject files with illegal format
           if ((this.extension !== 'application/pdf' && this.extension !== 'image/png' && this.extension !== 'image/jpeg'))
           {
            alert('Could not allow to upload ' + this.extension);
            this.selFiles = null;   // Cleans up the selfFiles array
            break;
          }
    }
  }

   /**
     * Upload selected files to Amazon S3 bucket
     * Otherwise display a pop-up message that no files uploaded
     */
    upload() {
    this.home.setCommonPreFixes('Service'); //Updating common preFixes from the folder 'Service' in S3
    let commonPrefix = this.home.getCommonPrefix(); // A variable that get the value of commonPrefix from getObject method (called in home class)
    console.log('CommonPrefix upload = ' + commonPrefix);
    commonPrefix = commonPrefix + 1; //increasing
    const resourceId = this.apiRequest.getAssetDetails()[0].resourceId; //resourceId from ApiRequest class
     //loop through the selected files, if there is any
    if (this.selFiles !== undefined && this.selFiles !== null){
      let file;
      let contentType;
      let fileName;
      for (let index = 0 ; index <= this.counter; index ++){

       file = this.selFiles.item(index);
       contentType = file.type;
       fileName =  this.currentDate + file.name;
       //S3 bucket params
       const params = {
          Bucket: 'asset-repair/' + resourceId + '/' + 'Service' + '/' + commonPrefix + '/' + 'Attached-files',
          Key:  fileName,
          Body: file,
          ACL: 'public-read',
          ContentType: file.type
        };
       this.fileService.upload(params);   // upload files to S3 bucket
     }
      this.onRouteSubmit(); // Open dialog

    }
    else{
       alert('No files uploaded!');
       this.onRouteSubmit();
     }

  }
    /**
     * Open dialog DialogInspectionComponent which displays the user input and gives
     * An option to download data as a PDF file
     */
  onRouteSubmit() {
    const dialogRef = this.dialog.open(DialogServiceComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result){
        this.pdf.Save(this.idt.value);  // Download PDF
      }
    });
    ////// Send data over to a service, so that the data can be used again////
    this.idt.date = this.registerForm.value.date.toLocaleDateString();
    this.idt.hours = this.registerForm.value.hours;
    this.idt.cost = this.registerForm.value.cost;
    this.idt.comment = this.registerForm.value.comment;
    this.idt.company = this.registerForm.value.company;
    this.idt.firstName = this.registerForm.value.firstName;
    this.idt.lastName = this.registerForm.value.lastName;
    this.idt.Email = this.registerForm.value.Email;
    this.idt.phone = this.registerForm.value.phone;
    this.idt.value = this.service.getSerNo();
  }

   /**
    * Reroute to home page
    */
  onBackSubmit(){
    this.router.navigate(['../home']);
  }
   /**
      * Function that uploads the generated PDF to AWS S3 bucket

   */

  UploadGeneratedPDF() {
    this.home.setCommonPreFixes('Service');

    let commonPrefix = this.home.getCommonPrefix();
    commonPrefix = commonPrefix + 1;

    this.initIdt();
    const fileName = this.currentDate + '-Entire-report.pdf';
    const file = this.pdf.Service(this.idt.company, this.idt.firstName + ` ` + this.idt.lastName,
      this.idt.date, this.idt.hours, this.idt.cost, this.idt.comment, this.idt.Email, this.idt.phone);

    const resourceId =  this.apiRequest.assetDetails[0].resourceId;
    const contentType = 'application/pdf';
    const params = {
      Bucket: 'asset-repair/' + resourceId + '/' + 'Service' + '/' + commonPrefix + '/' + 'Report',
      Key: fileName,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };

    this.fileService.upload(params);
    this.onRouteSubmit();
  }
  // A method that sets data to variables in InputDataTransferService service
  initIdt(){
    this.idt.date = this.registerForm.value.date.toLocaleDateString();
    this.idt.inspectionState = this.registerForm.value.inspectionStates?.viewValue;
    this.idt.company = this.registerForm.value.company;
    this.idt.firstName = this.registerForm.value.firstName;
    this.idt.lastName = this.registerForm.value.lastName;
    this.idt.Email = this.registerForm.value.Email;
    this.idt.phone = this.registerForm.value.phone;
    this.idt.comment = this.registerForm.value.comment;
    this.idt.cost = this.registerForm.value.cost;
    this.idt.hours = this.registerForm.value.hours;
    this.idt.value =  this.service.getSerNo();
  }

  validateResourceId(){
    //if there is data read from API
    if (this.apiRequest.getAssetDetails().length > 0){
      this.home.setCommonPreFixes('Service');    ////Updating common preFixes from the folder 'Service' in S3
    }
  }
}
/**
 * Dialog that displays the user input and gives the user the option to download
 * the data as PDF file
 */
@Component({
  selector: 'app-service',
  templateUrl: 'dialog-service.html',
  styleUrls: ['./dialog-service.scss'],

})
export class DialogServiceComponent {
  constructor(public idf: InputDataTransferService) {
  }
}


