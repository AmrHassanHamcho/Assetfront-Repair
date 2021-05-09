import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

/**
 * Injectable service to handle file related operations
 * And Amazon bucket declaration
 */


@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  private fileUploaded = false;

  constructor() { }

  //Method for Amazon Bucket verification data

  /**
   * Function for Amazon Bucket verification data
   * @return Bucket which contains the project files
   */

  public getS3Bucket(): any {
   // const bucket = new S3(
   //    {
   //      accessKeyId: 'AKIA3MSMUCO2MSPHGAKV',
   //      secretAccessKey: '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',
   //      region: 'eu-north-1'
   //   }
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

  //   uploadFile(file, FOLDER, resourceId) {
  //
  //   const params = {
  //     Bucket: 'assetfront-repair/' + resourceId + '/' + FOLDER,
  //     Key:  file.name,
  //     Body: file,
  //     ACL: 'public-read',
  //     ContentType: file.type
  //   };
  //
  //
  //   this.getS3Bucket().upload(params, (err, data) => {
  //     if (err) {
  //       console.log('There was an error uploading your file: ', err);
  //       return false;
  //     }
  //
  //     console.log('Successfully uploaded file.', data);
  //     return true;
  //   });
  //
  //
  //   this.fileUploaded = true;
  //
  // }

  /**
   * Function for uploading a file to Amazon Bucket
   * @return true if the file is legal
   * @return false otherwise
   */
  public upload(params){
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

}
