import { Injectable } from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';
import {FileServiceService} from '../fileService/file-service.service';
import {FileSaverService} from 'ngx-filesaver';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  data;
  public arrayOfFiles = [];
  public commonPrefix = 0;
  public lastModified = '';
  public commonPreFixInspection = 0;

  private resourceId;
  constructor(private apiRequest: ApiRequestService,
              private fileService: FileServiceService,
              private fileSaver: FileSaverService)
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
                this.data = data;
                if (this.commonPrefix >  0 ) {
                    this.lastModified = data.CommonPrefixes[this.commonPrefix - 1].Prefix + 'Report' + '/';
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
         console.log(data);       }
       const file = new File([data.Body], key , {type: data.ContentType});
       this.fileSaver.save(file);
    });
  }

  getCommonPrefix(){
    return this.commonPrefix;
  }

}
