import { Component, OnInit } from '@angular/core';
import {FileServiceService} from '../fileService/file-service.service';
import {ApiRequestService} from '../API-request/api-request.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import validate = WebAssembly.validate;
import {InputDataTransferService} from '../ inputDataTransfer/input-data-transfer.service';
import {PDFService} from '../PDF/pdf.service';
import {VehiclesService} from '../../vehicle-service/vehicle.service';


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
              private apiRequest: ApiRequestService,
              public dialog: MatDialog,
              public idt: InputDataTransferService,
              public PDF: PDFService,
              private router: Router,
              private service: VehiclesService

  ) {
    this.idt.value = service.getSerNo();
  }
  /**
   * File name uploaded by the user
   */
  private fileName = '';
  private extension = '';
  /**
   * An array to hold the files selected by the user
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
    {value: 'Bad', viewValue: 'Bad'},
    {value: 'Good', viewValue: 'Good'},
    {value: 'Excellent', viewValue: 'Excellent'}

  ];

  ngOnInit(): void {
  }

  /**
   * Returns an error message in case of illegal input
   *
   * @returns The function returns an error message
   *
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
    const resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
    if (this.selFiles !== undefined && this.selFiles !== null) {
      let file;
      let contentType;
      let name;
      // loop through files
      for (let index = 0; index <= this.counter; index++) {

        file = this.selFiles.item(index);
        contentType = file.type;
        name = file.name;
        const params = { // Bucket info

          Bucket: 'asset-repair/' + resourceId + '/' + 'Inspection',
          Key:  file.name,
          Body: file,
          ACL: 'public-read',
          ContentType: file.type}
        this.fileService.upload(params); // call upload function
        this.onRouteSubmit(); // call onRouteSubmit
      }
    } else {
      alert('No files uploaded!'); //display alert pop-up
      this.onRouteSubmit();
    }


  }

  /**
   *
   * Reroute to home page
   *
   */

  onBackSubmit() {
    this.router.navigate(['../home']);
  }

  /**
   *
   * Open dialog
   *
   */

  onRouteSubmit() {
    const dialogRef = this.dialog.open(DialogInspectionComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    ////// Send data over////
  }

  UploadGeneratedPDF() {
    this.initIdt();
    // calling Inspection PDF and saving it in a variable:
    const fileName = this.PDF.DateToday(this.service.getSerNo())
    const file = this.PDF.Inspection(this.idt.company, this.idt.fName + ` ` + this.idt.lName,
      this.idt.date, this.idt.inspectionState, this.idt.Email, this.idt.phone);
    const resourceId =  this.apiRequest.assetDetails[0].resourceId;
    const contentType = 'application/pdf';
    const params = {
      Bucket: 'asset-repair/' + resourceId + '/' + 'Inspection',
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
    this.idt.value =  this.service.getSerNo();
  }

}



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
