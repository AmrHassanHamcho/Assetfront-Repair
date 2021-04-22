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
  constructor(private apiRequest: ApiRequestService,
              private fileService:  FileServiceService)
  { }

  getListObject(folder) {
    let resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
    const params = { // Bucket info
      Bucket: 'asset-repair' ,
      Delimiter: '/',
      Prefix: resourceId + '/'+ folder + '/',
    }

    this.fileService.getS3Bucket().listObjectsV2(params, (err, data) => {
      if(err){
        console.log(err);
        this.lastModified = '';

      }
      else {
        this.commonPrefix = data.CommonPrefixes.length;
        console.log("commonprefix is: " + this.commonPrefix);
        //this.data = data;
       this.lastModified =  data.CommonPrefixes[this.commonPrefix-1].Prefix;
        console.log("LM is: " + this.lastModified);
      }
    });
    console.log("commonprefix is: " + this.commonPrefix);
      console.log("LM for return is: " + this.lastModified);
  }


  listFiles(params){
    this.fileService.getS3Bucket().listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        for(let i = 0; i < data.Contents.length; i++){
          this.arrayOfFiles.push(data.Contents[i].Key);
        }
      }
    })
    return this.arrayOfFiles;
  }
  getCommonPrefix(){
    return this.commonPrefix;
  }

  getArrayOfFiles(){
      return this.arrayOfFiles;
  }

}
