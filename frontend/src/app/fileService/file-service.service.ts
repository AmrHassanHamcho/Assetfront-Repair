import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  private fileUploaded = false;

  constructor() { }

  public getS3Bucket(): any {
   // const bucket = new S3(
      // {
        // accessKeyId: 'AKIA3MSMUCO2MSPHGAKV',
        // secretAccessKey: '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',
        // region: 'eu-north-1'

        // accessKeyId: 'AKIA3MSMUCO2MSPHGAKV',
        // secretAccessKey: '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',
        //region: 'eu-north-1'
     // }
   // );
        const bucket = new S3(
          {
            accessKeyId: 'AKIAXTNQB7H3IMBOMEGL',
            secretAccessKey: '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',
            region: 'eu-north-1'
          }
        );
        return bucket;
  }

  uploadFile(file, FOLDER, resourceId) {

    const params = {
      Bucket: 'assetfront-repair/' + resourceId + '/' + FOLDER ,
      Key:  file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type
    };


    this.getS3Bucket().upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });


    this.fileUploaded = true;


  }

  public upload( params){
    this.getS3Bucket().upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }else{
        console.log('Successfully uploaded file.', data);
        return true;
      }
    });


    this.fileUploaded = true;

  }


  oneFileUploadSuccess(){
    return this.fileUploaded;
  }
}
