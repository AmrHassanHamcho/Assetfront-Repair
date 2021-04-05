import { Injectable } from '@angular/core';
import {jsPDF} from 'jspdf'; // will automatically load the node version

import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import {NULL_AS_ANY} from "@angular/compiler-cli/src/ngtsc/typecheck/src/expression";
@Injectable({
  providedIn: 'root'
})
export class PDFService {
  private imageData: string;
  constructor() {
    this.ConstPdfStartX = 15;
    this.ConstPdfStartY = 40;
    this.PdfStartX = 15;
    this.FormStartX = 25;
    this.PdfStartY = 30;
    this.MaxWidth = 175;
    this.MaxHight = 10;
    this.EndPage = 250;
    // this.HeaderFooter();
  }
  reader = new FileReader();
  image = '/../assets/images/Repair_s_u_black.png';
  image2 = '/../assets/images/Repair_s_black.png';
  private ConstPdfStartX: number;
  private ConstPdfStartY: number;
  private PdfStartX: number;
  private PdfStartY: number;
  private MaxWidth: number;
  private MaxHight: number;
  private EndPage: number;
  doc = new jsPDF();
  private FormStartX: number;

// Getting today's date and puts it with VIN number:
  private newPDF: any;

  public myAngularxQrCode: string = null;

  Person(Company, Name, Date, Email, PhoneNR) {
    this.doc.text('Company: ' + Company, this.PdfStartX, this.PdfStartY);
    this.doc.text('Name: ' + Name, this.PdfStartX, this.PdfStartY += 10);
    this.doc.text('Date: ' + Date, this.PdfStartX , this.PdfStartY += 10);
    this.doc.text('Email: ' + Email, this.PdfStartX , this.PdfStartY += 10);
    this.doc.text('Phone Number: ' + PhoneNR, this.PdfStartX , this.PdfStartY += 10);
    this.PdfStartY += 20;
  }

  PageLimit() {
    if (this.PdfStartY > this.EndPage) {
      this.HeaderFooter();
      this.PdfStartY = this.ConstPdfStartY;
      this.doc.addPage();
    }
  }

  HeaderFooter() {

    this.doc.addImage(this.image, 'png', 0, 0, 80, 20);
    this.doc.addImage(this.image2, 'png', 130, 280, 80, 20);
  }

  DateToday(VINNum: string) {
    const now = new Date();
    const day = ('0' + now.getDate()).slice(-2);
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const Vintoday = (VINNum) + '_' + (day) + '-' + (month) + '-' + now.getFullYear() + '.pdf';

    // console.log(Vim_today);
    // this.doc.save(this.newPDF.DateToday('VinNumber'));
    return Vintoday;
  }

// Creates a new rectangle and creates space for the new one
  Rectangle() { // this is useless
    this.PageLimit();
    this.doc.setDrawColor(0);
    this.doc.setFillColor(255, 255, 255);
    this.doc.rect(this.PdfStartX, this.PdfStartY, this.MaxWidth, this.MaxHight); // Fill and Border
  }

  SmallRectangle(fill, x, y) {
    if (fill === true) {
      this.doc.setFillColor(0, 0, 0);
      this.doc.roundedRect(x, y, 5, 5, 2, 2, 'FD'); // Fill and Border
    } else {
      this.doc.setFillColor(255, 255, 255);
      this.doc.roundedRect(x, y, 5, 5, 2, 2, 'FD'); // Fill and Border
    }
  }


  PlaceForm(Message, ArgPick, ArgMessages) {
    // this.Rectangle()
    this.PdfStartY += 2.5;

    Message = Message + ':';
    this.doc.text(Message, this.FormStartX, this.PdfStartY + 4.5);
    const xNow = this.FormStartX + 25;

    for (let i = 0; i < ArgMessages.length; i++) {
      this.PdfStartY += 6;
      if (i === ArgPick) {
        this.SmallRectangle(true, xNow, this.PdfStartY);
        this.doc.text(ArgMessages[i], xNow + 7, this.PdfStartY + 4.5);
      } else {
        this.SmallRectangle(false,
          xNow, this.PdfStartY);
        this.doc.text(ArgMessages[i], xNow + 7, this.PdfStartY + 4.5);
      }
    }
    this.PageLimit();
    this.PdfStartY += 10;
  }

  getBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
  }

  download() {
    const qrcode = document.getElementById('qrcode');

    return  this.imageData = this.getBase64Image(qrcode.firstChild.firstChild);
  }

  LongText(Message){
    const split = this.doc.splitTextToSize(Message, 180);
    this.doc.text('Comment:' , this.PdfStartX, this.PdfStartY += 20);
    this.doc.text(split, this.PdfStartX, this.PdfStartY += 10);
  }

  Service(Company, Name, Date, Hours, Cost, Comment, Email, PhoneNr){
    this.doc = new jsPDF();

    // this.Reset();
    this.doc.addImage(this.download(), 'png', 160, 30, 20, 20);
    this.HeaderFooter();
    this.Person(Company, Name, Date, Email, PhoneNr);

    this.doc.text('Hours: ' + Hours, this.PdfStartX, this.PdfStartY);
    this.doc.text('Cost: ' + Cost, this.PdfStartX, this.PdfStartY += 10);

    this.LongText(Comment);

    this.doc.save(this.DateToday('VinNumber'));
    this.doc = null;

    this.Reset();


  }

  Inspection(Company, Name, Date, State, Email, PhoneNR){

    this.doc = new jsPDF();
    this.Reset();
    this.HeaderFooter();
    this.doc.addImage(this.download(), 'png', 160, 30, 20, 20);
    this.Person(Company, Name, Date, Email, PhoneNR);
    this.doc.text('State: ' + State, this.PdfStartX, this.PdfStartY);
    this.doc.save(this.DateToday('Date: '));
    this.doc = null;
    this.Reset();
  }

  Reset(){
    this.ConstPdfStartX = 15;
    this.ConstPdfStartY = 40;
    this.PdfStartX = 15;
    this.FormStartX = 25;
    this.PdfStartY = 30;
    this.MaxWidth = 175;
    this.MaxHight = 10;
    this.EndPage = 250;
  }

}


