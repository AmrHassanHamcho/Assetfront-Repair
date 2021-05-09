import { Component, OnInit } from '@angular/core';
import {FileServiceService} from '../fileService/file-service.service';
import {ApiRequestService} from '../API-request/api-request.service';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import validate = WebAssembly.validate;
import {InputDataTransferService} from '../ inputDataTransfer/input-data-transfer.service';
import {PDFService} from '../PDF/pdf.service';
import {VehiclesService} from '../vehicle-service/vehicle.service';
import {HomeService} from '../home/home.service';


interface InspectionState {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent  implements OnInit {

  constructor(public fileService: FileServiceService,
              private formBuilder: FormBuilder,
              public apiRequest: ApiRequestService,
              public dialog: MatDialog,
              public idt: InputDataTransferService,
              public PDF: PDFService,
              private router: Router,
              private service: VehiclesService,
              public home: HomeService

  ) {
    this.idt.value = service.getSerNo();
    this.validateResourceId();
  }
  /**
   * String variable to hold the fileName
   */
  private fileName = '';

  private extension = '';
  /**
   * A list to hold the files selected by the user
   */
  private selFiles: FileList;

  private files: any;
  /**
   * A counter to hold the number of files in selFiles[] array
   */
  private counter = 0;
  private name = '';

  Email = new FormControl('', [Validators.required, Validators.email]);

  registerForm = this.formBuilder.group({
    company: [''],
    Email: ['', {validators: [Validators.required, Validators.email]}],
    fName: [''],
    lName: [''],
    date: [''],
    phone: [''],
    inspectionStates: ['', {validate}],

  });

  inspectionStates: InspectionState[] = [
    {value: 'Approved', viewValue: 'Approved'},
    {value: 'Disapproved', viewValue: 'Disapproved'},
  ];

  ngOnInit(): void {
  }


  /**
   * Function for displaying an error msg in case of invalid email format
   * @return returns a 'Not a valid email' in case of mistype, or 'must enter a value' in case of empty field.
   */

   getErrorMessage() {
    if (this.Email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.Email.hasError('email') ? 'Not a valid email' : ''; // illegal email format
  }

  /**
   * Takes in file/s from user and put into selFiles[] array
   *
   * @param event - To get the user input from $event object
   *
   *
   */

  selectFile(event) {
    this.selFiles = event.target.files;
    this.counter = this.selFiles.length;

    for (let index = 0; index < this.counter; index++) { // for loop through the files from user
      this.fileName = this.selFiles.item(index).name;
      this.extension = this.selFiles.item(index).type;
      console.log(this.extension);

      // Reject files with illegal format
      if ((this.extension !== 'application/pdf' && this.extension !== 'image/png' && this.extension !== 'image/jpeg')) {
        alert('Could not allow to upload' + this.extension);
        this.selFiles = null;
        break;
      }

    }
    console.log(this.selFiles); // informative log of the files list to console
  }

  /**
   * Upload selected files to Amazon S3 bucket
   * Otherwise display a pop-up message that no files uploaded
   *
   *
   */

  upload(){
    this.home.setCommonPreFixes('Inspection');

    let commonPrefix = this.home.getCommonPrefix();
    console.log('CommonPrefix upload = ' + commonPrefix);
    commonPrefix = commonPrefix + 1;

    const resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
    if (this.selFiles !== undefined && this.selFiles !== null) {
      let file;
      let contentType;
      let fileName;
      //loop through the selected files, if there is any
      for (let index = 0; index <= this.counter; index++) {

        file = this.selFiles.item(index);
        contentType = file.type;
        fileName = file.name;
        //S3 bucket params
        const params = {
          Bucket: 'asset-repair/' + resourceId + '/' + 'Inspection' + '/' + commonPrefix + '/' + 'Attached-files',
          Key:  fileName,
          Body: file,
          ACL: 'public-read',
          ContentType: file.type
        };
        this.fileService.upload(params); // upload files to S3 bucket
      }
      this.onRouteSubmit(); //open dialog
    } else {
      alert('No files uploaded!'); // display alert pop-up
      this.onRouteSubmit();
    }
  }

  /**
   * Reroute to home page
   */

  onBackSubmit() {
    this.router.navigate(['../home']);
  }

  /**
   * Open dialog DialogInspectionComponent which displays the user input and gives
   * An option to download data as a PDF file
   */

  onRouteSubmit() {
    const dialogRef = this.dialog.open(DialogInspectionComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });


  }

  /**
   * Function that uploads the generated PDF to AWS S3 bucket
   */

  UploadGeneratedPDF() {
    this.home.setCommonPreFixes('Inspection'); //Updating common preFixes from the folder 'Inspection' in S3
    let commonPrefix = this.home.getCommonPrefix();
    commonPrefix = commonPrefix + 1; //upload to the next folder (count up)
    this.initIdt(); // A method that sets data to variables in InputDataTransferService service
    // calling Inspection PDF and saving it in a variable:
    const fileName = this.PDF.DateToday(this.service.getSerNo());
    const file = this.PDF.Inspection(this.idt.company, this.idt.firstName + ` ` + this.idt.lastName,
      this.idt.date, this.idt.inspectionState, this.idt.Email, this.idt.phone); // file naming
    const resourceId =  this.apiRequest.assetDetails[0].resourceId;
    const contentType = 'application/pdf';
    const params = {
      Bucket: 'asset-repair/' + resourceId + '/' + 'Inspection' + '/' + commonPrefix + '/' + 'Report',
      Key: fileName,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };

    this.fileService.upload(params); // calling upload method with the given parameters
    this.onRouteSubmit(); // calling onRouteSubmit method
  }

  // A method that sets data to variables in InputDataTransferService service
  initIdt(){
    this.idt.inspectionState = this.registerForm.value.inspectionStates?.viewValue;
    this.idt.company = this.registerForm.value.company;
    this.idt.firstName = this.registerForm.value.firstName;
    this.idt.lastName = this.registerForm.value.lastName;
    this.idt.Email = this.registerForm.value.Email;
    this.idt.phone = this.registerForm.value.phone;
    this.idt.value =  this.service.getSerNo();
    this.idt.date = this.registerForm.value.date.toLocaleDateString();

  }

  validateResourceId(){
    //if the user had access to any VIN
    if (this.apiRequest.getAssetDetails().length > 0){
      this.home.setCommonPreFixes('Inspection'); //Updating common preFixes from the folder 'Inspection' in S3
    }
  }

}

/**
 * Dialog that displays the user input and gives the user the option to download
 * the data as PDF file
 */

@Component({
  selector: 'app-service',
  templateUrl: 'dialog-inspection.html',
  styleUrls: ['./dialog-inspection.scss'],
//  providers: [ServiceComponent],
})
export class DialogInspectionComponent {
  constructor( public idt: InputDataTransferService) {
  }
}
