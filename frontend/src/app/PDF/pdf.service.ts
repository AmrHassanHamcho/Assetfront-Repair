import { Injectable } from '@angular/core';
import {jsPDF} from 'jspdf'; // will automatically load the node version



@Injectable({
  providedIn: 'root'
})
export class PDFService  {
  private imageData: string;
   optionHolder = [];

  constructor() {
    this.ConstPdfStartX = 15;
    this.ConstPdfStartY = 40;
    this.PdfStartX = 15;
    this.FormStartX = 25;
    this.PdfStartY = 30;
    this.MaxWidth = 175;
    this.MaxHight = 10;
    this.EndPage = 250;
    this.Page = 1;
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
  private Page: number;
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
    this.PageCounter();
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


  SmallRectangle(fill, x, y) {
    if (fill === true) {
      this.doc.setFillColor(0, 0, 0);
      this.doc.roundedRect(x, y, 5, 5, 2, 2, 'FD'); // Fill and Border
    } else {
      this.doc.setFillColor(255, 255, 255);
      this.doc.roundedRect(x, y, 5, 5, 2, 2, 'FD'); // Fill and Border
    }
  }

  PageCounter(){
    this.doc.setFontSize(10);
    this.doc.text(String(this.Page), 104, 288);
    this.Page++;
    this.doc.setFontSize(7);
  }

  PlaceForm(json: any, Company, Name, Date, Email, PhoneNR, VINNumber){
    this.doc = new jsPDF();
    console.log(json);
    this.Person(Company, Name, Date, Email, PhoneNR);
    this.doc.setFontSize(7);
    this.doc.setLineWidth(0);
    // this.Rectangle()
    this.PdfStartY += 2.5;
    const xNow = this.FormStartX + 25;
    let CheckpointName = '';
    let tcrName = ' ';
    let width = 0;
    for (let tcri = 0; tcri < json.length; tcri++){
      tcrName = json[tcri].name;
      this.doc.setFontSize(9);
      this.doc.text( tcrName , this.FormStartX - 2 , this.PdfStartY += 4.5);
      width = this.doc.getTextWidth(tcrName);
      this.doc.setLineWidth(0.2);
      this.doc.line(this.FormStartX - 2, this.PdfStartY += 1, this.FormStartX + width,  this.PdfStartY);
      this.doc.setLineWidth(0);
      this.doc.setFontSize(7);
      this.PdfStartY += 3;
      for (let cpi = 0; cpi < json[tcri].checkpoint.length; cpi ++){
        CheckpointName = json[tcri].checkpoint[cpi].name ;
        this.doc.text(CheckpointName, this.FormStartX, this.PdfStartY += 4.5);
        this.PdfStartY += 1;
        for (let opi = 0; opi < json[tcri].checkpoint[cpi].options.length; opi ++){
        this.optionHolder[opi] = json[tcri].checkpoint[cpi].options[opi].description;
          if ( opi === json[tcri].checkpoint[cpi].value) {
            this.SmallRectangle(true, xNow - 20, this.PdfStartY += 3);  // Filled
            this.doc.text(this.optionHolder[opi], xNow - 7, this.PdfStartY += 3.5);
          } else {
            this.SmallRectangle(false, xNow - 20, this.PdfStartY += 3); // Hollow
            this.doc.text(this.optionHolder[opi], xNow - 7, this.PdfStartY += 3.5);
            this.PageLimit();
          }
        }
        this.PdfStartY += 3;
      }

    }

    this.HeaderFooter();

    this.doc.save(this.DateToday(VINNumber));

    this.Reset();
    this.doc = null;
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

  Service(Company, Name, Date, Hours, Cost, Comment, Email, PhoneNr, VINNumber){
    this.doc = new jsPDF();

    // this.Reset();
    this.doc.addImage(this.download(), 'png', 160, 30, 20, 20);
    this.HeaderFooter();
    this.Person(Company, Name, Date, Email, PhoneNr);

    this.doc.text('Hours: ' + Hours, this.PdfStartX, this.PdfStartY);
    this.doc.text('Cost: ' + Cost, this.PdfStartX, this.PdfStartY += 10);

    this.LongText(Comment);

    this.doc.save(this.DateToday(VINNumber));
    this.doc = null;

    this.Reset();


  }

  Inspection(Company, Name, Date, State, Email, PhoneNR, VINNumber){

    this.doc = new jsPDF();
    this.Reset();
    this.HeaderFooter();
    this.doc.addImage(this.download(), 'png', 160, 30, 20, 20);
    this.Person(Company, Name, Date, Email, PhoneNR);
    this.doc.text('State: ' + State, this.PdfStartX, this.PdfStartY);
    this.doc.save(this.DateToday(VINNumber));
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


