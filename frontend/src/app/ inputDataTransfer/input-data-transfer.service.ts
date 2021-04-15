import { Injectable } from '@angular/core';
import {PDFService} from '../PDF/pdf.service';
import {VehiclesService} from '../../vehicle-service/vehicle.service';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
@Injectable({
  providedIn: 'root'
})



export class InputDataTransferService{
  workshop;
  Email;
  fName;
  lName;
  date;
  hours;
  comment;
  company;
  phone;
  coast;
  inspectionState;
  serialNumber = '';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value;

  constructor( private PDF: PDFService,
               private vehicle: VehiclesService) {
   this.elementType = NgxQrcodeElementTypes.URL;
   this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  }

   callPdfInspection(){
    this.serialNumber = this.vehicle.getSerNo();
    this.PDF.Inspection(
      this.company,
      this.fName + ' ' +
      this.lName,
      this.date,
      this.inspectionState,
      this.Email,
      this.phone);
    this.PDF.Save('1234');
    console.log('Here: ' + this.company,
        this.fName + ' ' +
        this.lName,
        this.date,
        this.inspectionState,
        this.Email,
        this.phone,
    this.value);

  }
  callPdfService() {
    this.serialNumber = this.vehicle.getSerNo();
    // tslint:disable-next-line:max-line-length
    this.PDF.Service(
      this.company,
      this.fName + ' ' +
      this.lName,
      this.date,
      this.hours,
      this.coast,
      this.comment,
      this.Email,
      this.phone);
  }
/*
  upload() {
    const contentType = 'application/pdf';
    const FOLDER = 'Inspection';
    const file = this.PDF.Inspection(
      this.company,
      this.fName + ' ' +
      this.lName,
      this.date,
      this.inspectionState,
      this.Email,
      this.phone,
      this.serialNumber);
    const bucket = new S3(
       {
         accessKeyId: 'AKIAXTNQB7H3IMBOMEGL',
         secretAccessKey: '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',
         region: 'eu-north-1'
       }
     );
    const params = {
      Bucket: 'json-file/' + 12346 + '/' + FOLDER,
      Key: 'inspection.pdf',
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };

    bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }else {
      console.log('Successfully uploaded file.', data);
      console.log('may be from here');
      return true; }
    });
  } */
}
