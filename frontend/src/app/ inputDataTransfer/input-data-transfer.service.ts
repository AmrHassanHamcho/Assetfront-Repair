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
  serialNumber;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = `Mustafa
            Abdi
            Shamil
            Amr`;

  constructor( private PDF: PDFService,
               private vehicle: VehiclesService) {}

   callPdfInspection(){
    this.serialNumber = this.vehicle.getSerNo();
   // tslint:disable-next-line:max-line-length
    this.PDF.Inspection(
      this.company,
      this.fName + ' ' +
      this.lName,
      this.date,
      this.inspectionState,
      this.Email,
      this.phone,
      this.serialNumber);
  }
  callPdfService() {
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
      this.phone,
      this.serialNumber);
  }

  callPdfTCR(){
  }
}
