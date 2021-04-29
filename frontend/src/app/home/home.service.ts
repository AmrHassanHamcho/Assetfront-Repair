import { Injectable } from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';
import {FileServiceService} from '../fileService/file-service.service';
import {FileSaverService} from 'ngx-filesaver';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  data;
  public arrayOfFiles = [];
  public commonPrefix = 0;
  public lastModified = '';
  public commonPrefixService = 0;
  public commonPreFixInspection = 0;
  public commonPreFixTCR = 0;

  private resourceId;
  constructor(private apiRequest: ApiRequestService,
              private fileService: FileServiceService,
              private fileSaver: FileSaverService,
              private http: HttpClient)
  { }

  setCommonPreFixes(folder){

    this.resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
    const params = { // Bucket info
      Bucket: 'asset-repair' ,
      Delimiter: '/',
      Prefix: this.resourceId + '/' + folder + '/',
    };

    this.fileService.getS3Bucket().listObjectsV2(params, (err, data) => {
      if (err){
        console.log(err);
      }
      else {
        this.commonPrefix = data.CommonPrefixes.length;
      }
    });
  }

  getListObject(folder){
   this.resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
   const params = { // Bucket info
      Bucket: 'asset-repair' ,
      Delimiter: '/',
      Prefix: this.resourceId + '/' + folder + '/',
    };

   this.fileService.getS3Bucket().listObjectsV2(params, (err, data) => {
      if (err){
        console.log(err);
        this.lastModified = '';

      }
      else {
        this.commonPrefix = data.CommonPrefixes.length;
        console.log('commonprefix in else is: ' + this.commonPrefix);
        this.data = data;
        if (this.commonPrefix >  0 ) {
          this.lastModified = data.CommonPrefixes[this.commonPrefix - 1].Prefix + 'Report' + '/';
          console.log('LM in else is: ' + this.lastModified);
        }

        const paramsForList = { // Bucket info
          Bucket: 'asset-repair' ,
          Delimiter: '/',
          Prefix: this.lastModified ,
        };

        this.fileService.getS3Bucket().listObjectsV2(paramsForList, ((error, data) => {
          if (error) {
            console.log(error);
          } else {
            console.log(data);
            for (let i = 0; i < data.Contents.length; i++){
              this.arrayOfFiles[i] = data.Contents[i].Key.split(this.lastModified)[1];
            }
          }
        }));
      }
    });
  }

  downloadFiles(key){
    console.log('this is the 8a6osh key: ' + key);
    this.resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
    const params = { // Bucket info
      Bucket: 'asset-repair',
      Key: this.lastModified  + key
    };

    this.fileService.getS3Bucket().getObject(params, (err, data) => {
       if (err) { console.log(err, err.stack); } // an error occurred
       else    {
       //  console.log(data);
         console.log(data);       }
       const file = new File([data.Body], key , {type: data.ContentType});
       this.fileSaver.save(file);
    });
  }

  getCommonPrefix(){
    return this.commonPrefix;
  }

  getArrayOfFiles(){
      return this.arrayOfFiles;
  }
}
