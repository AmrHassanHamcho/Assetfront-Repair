import { Component, OnInit } from '@angular/core';
import {FileServiceService} from "../fileService/file-service.service";
import {ApiRequestService} from "../API-request/api-request.service";


interface InspectionState {
  value: string;
  viewValue: string;
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



  constructor( private fileService:FileServiceService, private apiRequest: ApiRequestService) { }

  ngOnInit(): void {
  }


  onUpdateDate(event: Event)
  {
    this.date = (<HTMLInputElement>event.target).value;
  }


  inspectionStates: InspectionState[] = [
    {value: 'Good', viewValue: 'Good'},
    {value: 'Excellent', viewValue: 'Excellent'},
    {value: 'Bad', viewValue: 'Bad'}
  ];

  ////////////////////////////////////////////
  selectFile(event) {


    this.selFiles = event.target.files;
    this.counter = this.selFiles.length;
    var fileName = event.target.value;
    var extension = fileName.substr(fileName.lastIndexOf('.'));

    if ((extension.toLowerCase() != ".pdf" || extension.toLowerCase() != ".png"))
    {
      //this.selFiles = null;
      alert("Could not allow to upload " + extension);

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
