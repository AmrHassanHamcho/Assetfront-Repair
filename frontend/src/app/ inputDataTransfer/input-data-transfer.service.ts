import { Injectable } from '@angular/core';
import {PDFService} from '../PDF/pdf.service';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';

@Injectable({
  providedIn: 'root'
})
export class InputDataTransferService {
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

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://assetfront.com';

  constructor( private PDF: PDFService ) {}

   callPdfInspection()
  {
    this.PDF.Inspection(this.company, this.fName + ' ' + this.lName, this.date, this.inspectionState, this.Email, this.phone);
  }

  callPdfService()
  {
    this.PDF.Service(this.company, this.fName + ' ' + this.lName, this.date, this.hours, this.coast, this.comment, this.Email, this.phone);
  }
  callPdfTCR(){

  }
}
