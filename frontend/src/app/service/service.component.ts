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

  selectedFile: File = null;
  selFiles : FileList;
  comment = '';
  hours = '';
  coast = '';
  date = '';
  private files: any;
  private bucket: any;
  private FOLDER = 'test';
  private counter = 0;
  private contentType = '';
  private name = '';
  private fileUploaded = false;






  constructor(private http:HttpClient, private fileService:FileServiceService, private apiRequest: ApiRequestService) { }

  ngOnInit(): void {
  }

  onFileSelect(event){
    console.log(event);
    this.selectedFile =<File>event.target.files[0];
  }

  // onFileChange(files){
  //   for(let index = 0; index<files.length; index++){
  //     console.log("inside loop")
  //     const file = files[index];
  //     this.files.push({ data:file, inProgress: false, progress:0});
  //   }
  //   this.files.forEach(file => {
  //     this.uploadFile(file);
  //   });
  // }

//   uploadFile(file){
//
//     var params = {Bucket : 'assetfront-repair', key: 'repair'+'/Service' + file.data.name, Expires: 3600, contentType:file.data.type};
//     var url = this.bucket.getSignedUrl('putObject', params);
//     this.http.put<any>(url,file.data).subscribe({
//       next: data =>{console.log(data);},
//       error: error =>{console.error('There is an error!', error)
//       alert(JSON.stringify(error))}
//     });
//
//   }





  onFileUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile,this.selectedFile.name);
    //this.http.post(url,fd) // any backend function that accepts foreign data, in our case AWS url
    //.subscribe(event=> {
    // msg to usr
    // or log to console: console.log(event)
    //})



    // in case we want to track the progress of the file upload

    //this.http.post(url,fd, {
    //  reportProgress: true,
    //  observe: 'events'
    //
    //
    // })
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

  oneFileUploadSuccess(){
    return this.fileUploaded;
  }

}
