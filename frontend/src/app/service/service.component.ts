import { Component, OnInit } from '@angular/core';

import {HttpClient, HttpClientModule} from "@angular/common/http";
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {FileServiceService} from "../fileService/file-service.service";
import {ApiRequestService} from "../API-request/api-request.service";




@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  selFiles : FileList;
  comment = '';
  hours = '';
  coast = '';
  date = '';

  private files: any;
  private counter = 0;
  private contentType = '';
  private name = '';


  constructor(private http:HttpClient, public fileService:FileServiceService, private apiRequest: ApiRequestService) { }


  ngOnInit(): void {
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

  // uploadFile(file) {
  //
  //     const bucket = new S3(
  //       {
  //         accessKeyId: 'AKIA3MSMUCO2MSPHGAKV',
  //         secretAccessKey: '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',
  //         region: 'eu-north-1'
  //       }
  //     );
  //
  //     const params = {
  //       Bucket: 'assetfront-repair/' + this.FOLDER,
  //       Key:   this.name,
  //       Body: file,
  //       ACL: 'public-read',
  //       ContentType: this.contentType
  //     };
  //     bucket.upload(params, function (err, data) {
  //       if (err) {
  //         console.log('There was an error uploading your file: ', err);
  //         return false;
  //       }
  //       console.log('Successfully uploaded file.', data);
  //       return true;
  //     });
  // }

  upload() {

     for (let index =0; index <=this.counter; index ++){

      const file = this.selFiles.item(index);
      console.log(file.type);
      this.contentType = file.type;
      this.name = file.name;
     this.fileService.uploadFile(file, 'Service', this.apiRequest.assetDetails[0].resourceId);
     }
  }



}
