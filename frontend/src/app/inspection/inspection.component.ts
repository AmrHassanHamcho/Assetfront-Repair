import { Component, OnInit } from '@angular/core';
import {FileServiceService} from "../fileService/file-service.service";
import {ApiRequestService} from "../API-request/api-request.service";
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from "@angular/router";
import {DialogContentExampleDialog} from "../service/service.component";


interface InspectionState {
  value: string;
  viewValue: string;
}

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements OnInit {
  inspectionStatus = '';
  selectedStatus: string;
  selectedFile: File = null;
  fileName='';
  extension = '';




  selFiles : FileList;

  private files: any;

  private counter = 0;
  private contentType = '';
  private name = '';
  private formBuilder: FormBuilder;

  Email = new FormControl('', [Validators.required, Validators.email]);


  registerForm = this.formBuilder.group({
    workshop: [''],
    Email: ['', {
      validators: [Validators.required, Validators.email],
    }],
    fName: [''],
    lName: [''],
    date: [''],
    comment: [''],
    phone: [''],
  });



  constructor( public fileService:FileServiceService,
               private apiRequest: ApiRequestService,
               private router : Router) { }

  ngOnInit(): void {
  }

  getErrorMessage(){
    if (this.Email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.Email.hasError('email') ? 'Not a valid email' : '';
  }







  stateControl = new FormControl('', Validators.required);
  inspectionStates: InspectionState[] = [
    {value: 'Bad', viewValue: 'Bad'},
    {value: 'Good', viewValue: 'Good'},
    {value: 'Excellent', viewValue: 'Excellent'}

  ];

  ////////////////////////////////////////////
  selectFile(event)
  {
    this.selFiles = event.target.files;
    this.counter = this.selFiles.length;

    for(let index = 0; index < this.counter ; index++){
      this.fileName =  this.selFiles.item(index).name;
      this.extension = this.selFiles.item(index).type;
      console.log(this.extension);

      if ((this.extension != 'application/pdf' && this.extension != 'image/png' && this.extension != 'image/jpeg'))
      {
        alert("Could not allow to upload " + this.extension);
        this.selFiles = null;
        break;
      }

    }
    console.log(this.selFiles);

  }
  upload() {

    if(this.selFiles !== undefined && this.selFiles !== null){
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
      alert("No files uploaded!");
      this.onRouteSubmit();
    }



  }

  onBackSubmit(){

    this.router.navigate(['../home']);
  }

  onRouteSubmit() {
    // const dialogRef = this.dialog.open(DialogContentExampleDialog);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

  }

}
