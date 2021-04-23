import { Injectable } from '@angular/core';
import {ApiRequestService} from "../API-request/api-request.service";
import {FileServiceService} from "../fileService/file-service.service";


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  data;
  public arrayOfFiles = [];
  public commonPrefix: number;
  public lastModified = '';
  private resourceId;
  constructor(private apiRequest: ApiRequestService,
              private fileService:  FileServiceService)
  {
  }

  getListObject(folder) {
   this.resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
    const params = { // Bucket info
      Bucket: 'asset-repair' ,
      Delimiter: '/',
      Prefix: this.resourceId + '/'+ folder + '/',
    }

    this.fileService.getS3Bucket().listObjectsV2(params, (err, data) => {
      if(err){
        console.log(err);
        this.lastModified = '';

      }
      else {
        this.commonPrefix = data.CommonPrefixes.length;
        console.log("commonprefix in else is: " + this.commonPrefix);
        //this.data = data;
       this.lastModified =  data.CommonPrefixes[this.commonPrefix-1].Prefix;
        console.log("LM in else is: " + this.lastModified);
      }
    });
  }


  listFiles(folder){
    this.getListObject(folder);
    this.resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
    const params = { // Bucket info
      Bucket: 'asset-repair' ,
      Delimiter: '/',
      Prefix: this.lastModified,
    }
    this.fileService.getS3Bucket().listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        for(let i = 0; i < data.Contents.length; i++){
          this.arrayOfFiles[i] = data.Contents[i].Key.split(this.lastModified)[1];
        }
      }
    })
  }

  downloadFiles(key){
    console.log('this is the 8a6osh key: ' + key);
    this.resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
    const params = { // Bucket info
      Bucket: 'asset-repair',
      Key: this.lastModified  + key ,

    }
    this.fileService.getS3Bucket().getObject(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else    {

        console.log(data);
        // successful response



      }

    });
  }


  getCommonPrefix(){
    return this.commonPrefix;
  }

  getArrayOfFiles(){
      return this.arrayOfFiles;
  }

}
