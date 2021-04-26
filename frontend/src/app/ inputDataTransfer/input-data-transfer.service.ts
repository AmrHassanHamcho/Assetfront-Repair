import { Injectable } from '@angular/core';
import {PDFService} from '../PDF/pdf.service';
import {VehiclesService} from '../../vehicle-service/vehicle.service';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';

/**
 * Injectable service to pass data to ServiceComponent and InspectionComponent
 * As well as the dialogs attached to them
 */


@Injectable({
  providedIn: 'root'
})


/*
* InputDataTransferService Service class
*/



export class InputDataTransferService{


/*
* Declaring public variables to hold the value from the input forms in ServiceComponent
* and InspectionComponent
* The variables will be passed further to display the summary of the form
* As well as to PDF service where the final pdf is generated
*/

  public Email : string;
  public fName: string;
  public lName: string;
  public date: any;
  public hours: number;
  public comment: string;
  public company: string;
  public phone: string;
  public cost: number;
  public inspectionState: any;
  public serialNumber: string = '' ;
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public value: any;

  constructor( private PDF: PDFService,
               private vehicle: VehiclesService) {
   this.elementType = NgxQrcodeElementTypes.URL;
   this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  }

  // Method for storing data in PDF which will be generated from Inspection form
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
    this.PDF.Save(this.value);

  }

  // Method for storing data in PDF which will be generated from Service form
  callPdfService() {
    this.serialNumber = this.vehicle.getSerNo();
    // tslint:disable-next-line:max-line-length
    this.PDF.Service(
      this.company,
      this.fName + ' ' +
      this.lName,
      this.date,
      this.hours,
      this.cost,
      this.comment,
      this.Email,
      this.phone);
  }

}
