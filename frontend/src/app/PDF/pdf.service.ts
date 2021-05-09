import { Injectable } from '@angular/core';
import {jsPDF} from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PDFService  {

  private imageData: string;
  optionHolder = [];

  constructor() {
    this.ConstPdfStartX = 15; // Start coordinate of X constant
    this.ConstPdfStartY = 40; // Start coordinate of Y (page start) constant
    this.PdfStartX = 15; // Start coordinate of X
    this.FormStartX = 25; // TCR form start X
    this.PdfStartY = 30; // Start coordinate of X
    this.MaxWidth = 175; // Max width of page
    this.Page = 1; // Page counter
  }
  reader = new FileReader();
  image = '/../assets/images/Repair_s_u_black.png';
  image2 = '/../assets/images/Repair_s_black.png';
  private ConstPdfStartX: number;
  private ConstPdfStartY: number;
  private PdfStartX: number;
  private PdfStartY: number;
  private MaxWidth: number;
  private Page: number;
  doc = new jsPDF();
  private FormStartX: number;

// Getting today's date and puts it with VIN number:
  private newPDF: any;

  public myAngularxQrCode: string = null;

  Person(Company, Name, Date, Email, PhoneNR) {
    /**
     * This function puts Users information on the PDF
     * @parameters of this function are user input of their information
     */
    this.doc.text('Company: ' + Company, this.PdfStartX, this.PdfStartY);
    this.doc.text('Name: ' + Name, this.PdfStartX, this.PdfStartY += 10);
    this.doc.text('Date: ' + Date, this.PdfStartX , this.PdfStartY += 10);
    this.doc.text('Email: ' + Email, this.PdfStartX , this.PdfStartY += 10);
    this.doc.text('Phone Number: ' + PhoneNR, this.PdfStartX , this.PdfStartY += 10);
    this.PdfStartY += 20;
  }

  PageLimit(PagePixelLim) {
    /**
     * @param where the page limit is
     * This function checks if the page has reached a limit, if it has it adds the header and footer
     * resets Y cordinate and adds a new page
     *
     */
    if (this.PdfStartY > PagePixelLim) {
      this.HeaderFooter();
      this.PdfStartY = this.ConstPdfStartY;
      this.doc.addPage();
    }
  }

  HeaderFooter() {
    /**
     * This function adds header and footer image and running page counter
     *
     */
    this.PageCounter();
    this.doc.addImage(this.image, 'png', 0, 0, 80, 20);
    this.doc.addImage(this.image2, 'png', 130, 280, 80, 20);
  }

  DateToday(VINNum: string) {
    /**
     * @param VIN number
     * This function gets VIN number and gets date of today and returns it back
     * @return the combined date and vin number in form of VIN_DD_MM_YYYY.pdf with pdf extention
     */
    const now = new Date();
    const day = ('0' + now.getDate()).slice(-2);
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const Vintoday = (VINNum) + '_' + (day) + '-' + (month) + '-' + now.getFullYear() + '.pdf';
    return Vintoday;
  }


  SmallRectangle(fill, x, y) {
    /**
     * @param fill: if the rectangle will get filled or not. x: x coordinate. y: y coordinate
     * This function fills out the check function inside TCR form when needed
     *
     */
    if (fill === true) {
      this.doc.setFillColor(0, 0, 0);
      this.doc.roundedRect(x, y, 5, 5, 2, 2, 'FD'); // Fill and Border
    } else {
      this.doc.setFillColor(255, 255, 255);
      this.doc.roundedRect(x, y, 5, 5, 2, 2, 'FD'); // Fill and Border
    }
  }

  PageCounter(){
    /**
     * This function puts the page counter in the bottom of each page
     */
    this.doc.setFontSize(10);
    this.doc.text(String(this.Page), 104, 288);
    this.Page++;
    this.doc.setFontSize(7);
  }

  PlaceForm(json: any, Company, Name, Date, Email, PhoneNR){
    /**
     * @param:
     * Json: modified json file from user input
     * Company, Name, Date, Email, PhoneNR are user input
     *
     * This function goes mainly through the JSON file inputted and tries to sort everything into a PDF document
     *
     * @return Returns the PDF file as an object
     */
    this.Reset();
    this.doc = null;
    this.doc = new jsPDF();
    this.Person(Company, Name, Date, Email, PhoneNR);

    try {
      this.doc.addImage(this.download(), 'png', 140, 30, 30, 30);
    }
    catch (error) {
      console.error('Unable to generate QR-code', error);
    }

    this.doc.setFontSize(7);
    this.doc.setLineWidth(0);
    // this.Rectangle()
    this.PdfStartY += 2.5;
    const xNow = this.FormStartX + 25;
    let CheckpointName = '';
    let tcrName = ' ';
    let width = 0;
    for (const tcr of json) {
      this.PageLimit(230);
      tcrName = tcr.name;
      this.doc.setFontSize(9);
      this.doc.text( tcrName , this.FormStartX - 2 , this.PdfStartY += 4.5);
      width = this.doc.getTextWidth(tcrName);
      this.doc.setLineWidth(0.2);
      this.doc.line(this.FormStartX - 2, this.PdfStartY += 1, this.FormStartX + width,  this.PdfStartY);
      this.doc.setLineWidth(0);
      this.doc.setFontSize(7);
      this.PdfStartY += 3;
      for (const cp of tcr.checkpoint) {
        this.PageLimit(240);
        CheckpointName = cp.name ;
        this.doc.text(CheckpointName, this.FormStartX, this.PdfStartY += 4.5);
        this.PdfStartY += 1;
        for (let opi = 0; opi < cp.options.length; opi ++){
          this.optionHolder[opi] = cp.options[opi].description;
          if ( opi === cp.value) {
            this.SmallRectangle(true, xNow - 20, this.PdfStartY += 3);  // Filled
            this.doc.text(this.optionHolder[opi], xNow - 7, this.PdfStartY += 3.5);
          } else {
            this.SmallRectangle(false, xNow - 20, this.PdfStartY += 3); // Hollow
            this.doc.text(this.optionHolder[opi], xNow - 7, this.PdfStartY += 3.5);

          }
        }
        this.PdfStartY += 3;
      }

    }

    this.HeaderFooter();

    const file = this.doc.output('arraybuffer');

    return file;
  }



  getBase64Image(img) {
    /**
     * @param: takes in QR code as image
     *
     * Takes in an image and converts it to base64 to makes it ready to put in to the PDF
     *
     * @return Returns qr code as BASE64
     */
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
  }

  download() {
    /**
     *
     * Finds Qr code generated in HTML
     *
     * @return Returns qr code as object
     */
    const qrcode = document.getElementById('qrcode');
    this.imageData = this.getBase64Image(qrcode.firstChild.firstChild);
    return  this.imageData;
  }

  LongText(Message){
    /**
     * @param: takes in long text
     *
     * Takes in long text and make sure the text is split in different lines to fit the page
     *
     */
    const split = this.doc.splitTextToSize(Message, 180);
    this.doc.text('Comment:' , this.PdfStartX, this.PdfStartY += 20);
    this.doc.text(split, this.PdfStartX, this.PdfStartY += 10);
  }

  Service(Company, Name, Date, Hours, Cost, Comment, Email, PhoneNr){
    /**
     * @param: takes in user input for service
     *
     * Takes in parameters and puts it inside a pdf file
     *
     * @return Returns the PDF file as an object
     */
    this.Reset();
    this.doc = null;
    this.doc = new jsPDF();


    this.HeaderFooter();
    this.doc.setFontSize(12);
    this.Person(Company, Name, Date, Email, PhoneNr);

    this.doc.text('Hours: ' + Hours, this.PdfStartX, this.PdfStartY);
    this.doc.text('Cost: ' + Cost, this.PdfStartX, this.PdfStartY += 10);

    this.LongText(Comment);

    try{
      this.doc.addImage(this.download(), 'png', 140, 30, 30, 30);
    }
    catch (error){
      console.log('Error');
    }

    const file = this.doc.output('arraybuffer');
    return file;
  }

  Inspection(Company, Name, Date, State, Email, PhoneNR){
    /**
     * @param: takes in user input for inspection
     *
     * Takes in parameters and puts it inside a pdf file
     *
     * @return Returns the PDF file as an object
     */
    this.doc = null;
    this.Reset();

    this.doc = new jsPDF();
    this.Reset();
    this.HeaderFooter();
    this.doc.setFontSize(12);
    try{
      this.doc.addImage(this.download(), 'png', 140, 30, 30, 30);
    }
    catch (error){
      console.log('Error');
    }
    this.Person(Company, Name, Date, Email, PhoneNR);
    this.doc.text('State: ' + State, this.PdfStartX, this.PdfStartY);
    const file = this.doc.output('arraybuffer');

    return file;
  }

  Reset(){
    // Resets all variables
    this.ConstPdfStartX = 15;
    this.ConstPdfStartY = 40;
    this.PdfStartX = 15;
    this.FormStartX = 25;
    this.PdfStartY = 30;
    this.MaxWidth = 175;
    this.Page = 1;
  }

  Save(VINNumber){
    /**
     * @param: Gets vinnumber
     *
     * Gets browser to download a PDF file using VINnumber and date
     *
     */
    this.doc.save(this.DateToday(VINNumber));
  }
}


