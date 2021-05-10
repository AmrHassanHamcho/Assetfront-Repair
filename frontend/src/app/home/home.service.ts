import { Injectable } from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';
import {FileServiceService} from '../fileService/file-service.service';
import {FileSaverService} from 'ngx-filesaver';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public data;
  /**
   * an array that holds the files in directory in S3
   */
  public arrayOfFiles = [];
  /**
   * commonPrefix of the data object from listObjectsV2
   */
  public commonPrefix = 0;
  /**
   * lastModified of the data object from listObjectsV2
   */
  public lastModified = '';
  private resourceId;
  constructor(private apiRequest: ApiRequestService,
              private fileService: FileServiceService,
              private fileSaver: FileSaverService)
  { }

  /**
   * Function that update CommonPrefixes from the data returned from listObjectsV2 method
   * @param folder is the folder in S3
   */

  setCommonPreFixes(folder){
      this.resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
      const params = { // Bucket info
      Bucket: 'asset-repair' ,
      Delimiter: '/',
      Prefix: this.resourceId + '/' + folder + '/',
    };
      //listObjects from S3 bucket in a specific folder
      this.fileService.getS3Bucket().listObjectsV2(params, (err, data) => {
      if (err){
        console.log(err);
      }
      else {
        this.commonPrefix = data.CommonPrefixes.length; //count objects and update commonPrefix
      }
    });
  }
  /**
   * Function that lists all objects in a specified folder
   * @param folder is the folder in S3
   */

  getListObject(folder){
        this.resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
        const params = { // Bucket info
            Bucket: 'asset-repair' ,
            Delimiter: '/',
            Prefix: this.resourceId + '/' + folder + '/',
        };
        //List objects in Folder
        this.fileService.getS3Bucket().listObjectsV2(params, (err, data) => {
          //if no objects, set lastModified to an empty string
            if (err){
                console.log(err);
                this.lastModified = '';
            }
            else {
                this.commonPrefix = data.CommonPrefixes.length; // update commonPrefix
                this.data = data;
                // if the folder is not empty
                if (this.commonPrefix >  0) {
                    this.lastModified = data.CommonPrefixes[this.commonPrefix - 1].Prefix + 'Report' + '/'; // go to Report folder and copy the path to common prefix
                }

                const paramsForList = { // Bucket info that leads to the last object  / report folder
                    Bucket: 'asset-repair' ,
                    Delimiter: '/',
                    Prefix: this.lastModified ,
                };

                this.fileService.getS3Bucket().listObjectsV2(paramsForList, ((error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        for (let i = 0; i < data.Contents.length; i++){
                            this.arrayOfFiles[i] = data.Contents[i].Key.split(this.lastModified)[1]; // fill arrayOffiles with the files in last object / report /
                        }
                    }
                }));
            }
        });
    }
  /**
   * Function that Downloads a specified file
   * @param key is the name of the file which be be displayed
   */
  downloadFiles(key){
    this.resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
    const params = { // Bucket info that has the key of the specified file
      Bucket: 'asset-repair',
      Key: this.lastModified  + key
    };
    this.fileService.getS3Bucket().getObject(params, (err, data) => {
       if (err) { console.log(err, err.stack); } // an error occurred
       else    {
         console.log(data);       }
       const file = new File([data.Body], key , {type: data.ContentType});
       this.fileSaver.save(file); // download file
    });
  }

  /**
   * Getter function for prefix of the list of files returned from getObject method
   * @return commonPrefix of data object from getObject method
   */

  getCommonPrefix(){
    return this.commonPrefix;
  }

}
