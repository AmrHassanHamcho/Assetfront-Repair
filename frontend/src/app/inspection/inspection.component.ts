import { Component, OnInit } from '@angular/core';
import {FileServiceService} from "../fileService/file-service.service";
import {ApiRequestService} from "../API-request/api-request.service";
import {FormControl, Validators} from "@angular/forms";


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
  date = '';




  selFiles : FileList;

  private files: any;

  private counter = 0;
  private contentType = '';
  private name = '';



  constructor( public fileService:FileServiceService, private apiRequest: ApiRequestService) { }

  ngOnInit(): void {
  }


  onUpdateDate(event: Event)
  {
    this.date = (<HTMLInputElement>event.target).value;
  }




  stateControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  inspectionStates: InspectionState[] = [
    {value: 'Bad', viewValue: 'Bad'},
    {value: 'Good', viewValue: 'Good'},
    {value: 'Excellent', viewValue: 'Excellent'}

  ];

  ////////////////////////////////////////////
  selectFile(event) {


    this.selFiles = event.target.files;
    this.counter = this.selFiles.length;
    var fileName = (<HTMLInputElement>event.target).value;
    var extension = fileName.substr(fileName.lastIndexOf('.'));

    if ((extension!= '.pdf' && extension != '.png' && extension != '.jpeg'))
    {
      alert("Could not allow to upload " + extension);
      //this.selFiles = null;
    }


  }
  upload() {

   // for (let index = 0; index <=this.counter; index ++){

      const file = this.selFiles.item(0);
      console.log(file.type);
      this.contentType = file.type;
      this.name = file.name;
      this.fileService.uploadFile(file, 'Inspection', this.apiRequest.assetDetails[0].resourceId);
    }
  //}

}
