import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../vehicle-service/vehicle.service';
import {ApiRequestService} from '../../API-request/api-request.service';
import {TcrService} from '../tcr.service';
import {PDFService} from '../../PDF/pdf.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import {InputDataTransferService} from '../../ inputDataTransfer/input-data-transfer.service';
import {MatDialog} from '@angular/material/dialog';
import {TcrDialogComponent} from '../tcr-dialog/tcr-dialog.component';
import {FileServiceService} from '../../fileService/file-service.service';
import {HomeService} from '../../home/home.service';
@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  myDate = new Date();
  currentDate  = this.myDate.getFullYear() + '-' +
    this.myDate.getMonth() + '-' +
    this.myDate.getDate() + '-' +
    this.myDate.getHours() + '-' +
    this.myDate.getMinutes();
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

  lastName: string;
  firstName: string;
  workshop: string;
  email = new FormControl('', [Validators.required, Validators.email]);

  registerForm = this.formBuilder.group({
    workshop: [''],
    email: ['', {
      validators: [Validators.required, Validators.email],
    }],
    firstName: [''],
    lastName: [''],
    date: [''],
    phone: [''],
  });

  ngOnInit(): void {
  }
  /**The method gets the commonPrefix and increment it by 1.
   * sets the file type to json
   * specify where to upload i,e. Bucket and folder
   * like so 'asset-repair/resourceId/TCR/commonPrefix/Attached-files',
   * it then stringify the newly filled TCR and uploads it to specified S3 bucket
   */
  upload() {
    this.home.setCommonPreFixes('TCR'); // sets the common prefix for 'TCR' folder
    let commonPrefix = this.home.getCommonPrefix();
    commonPrefix = commonPrefix + 1; // Increase commonPrefix by one

    const resourceId =  this.request.assetDetails[0].resourceId;
    const contentType = 'json'; // file type

    const params = {
      Bucket: 'asset-repair/' + resourceId + '/' + 'TCR' + '/' + commonPrefix + '/' + 'Attached-files',
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
    // navigate to tcr component
    this.router.navigate(['/tcr']);
  }
/** makes call to pdf.PlaceForm to generate PDF
 * from user detail and newly filled TCR
 * @return return file which is in pdf format
 */
  generatePdfFromTCR(){
    const person = this.registerForm.value;
    const file = this.pdf.PlaceForm(this.tcr.getTcr().tcr, person.workshop, person.firstName + ' '
      + person.lastName, person.date.toLocaleDateString(), person.email, person.phone);
    return file;

  }
  getErrorMessage() {
    // Error message for email field
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
/** Dialog window to display successful submission of the TCR.
 * Depending on user choice either downloads pdf or redirect to Search component
 */
  success() {
    const dialogRef =  this.dialog.open(TcrDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
     if (result){
        this.pdf.Save(this.idt.value);
      }else {
       this.toSearch();
     }
   });
  }
  // redirect to search component
  toSearch() {
    console.log('to search component...');
    this.router.navigate(['../search']);
  }
/** The method sets prefix to TCR  and increment the commonPrefix by 1
 * Then  Uploads the generated pdf to s3 Bucket
 * The PDF is generated in PDFService
 */

  UploadGeneratedPDF() {
    this.home.setCommonPreFixes('TCR');
    let commonPrefix = this.home.getCommonPrefix();
    commonPrefix = commonPrefix + 1; // increase commonPrefix by one

    this.initIdt();
    // calling TCR PDF and saving it in a variable:
    const file = this.generatePdfFromTCR();
    const resourceId =  this.request.assetDetails[0].resourceId;
    const fileName = this.currentDate + '-Entire-report.pdf';
    const contentType = 'application/pdf';
    const params = {
      Bucket: 'asset-repair/' + resourceId + '/' + 'TCR' + '/' + commonPrefix + '/' + 'Report',
      Key: fileName,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };

    this.fileService.upload(params); // upload to the file


  }
  /** Initiates InputDataTransferService with the Desired value
   */
  initIdt(){
    this.idt.company = this.registerForm.value.workshop;
    this.idt.firstName = this.registerForm.value.firstName;
    this.idt.lastName = this.registerForm.value.lastName;
    this.idt.Email = this.registerForm.value.email;
    this.idt.phone = this.registerForm.value.phone;
    this.idt.value =  this.vehicleservice.getSerNo();
    this.idt.date = this.registerForm.value.date.toLocaleDateString();

  }


}
