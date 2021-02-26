import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  selectedFile: File = null;
  comment = '';
  hours = '';
  coast = '';
  date = '';
  constructor(private http:HttpClientModule) { }

  ngOnInit(): void {
  }

  onFileSelect(event){
    console.log(event);
    this.selectedFile =<File>event.target.files[0];
  }
  onFileUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile,this.selectedFile.name);
    //this.http.post(url,fd) // any backend function that accepts forgein data, in our case AWS url
    //.subscribe(event=> {
    // msg to usr
    // or log to console: console.log(event)
    //})



    // in case we want to track the progress of the file upload

    //this.http.post(url,fd, {
    //  reportProgress: true,
    //  observe: 'events'
    //
    //
    // })
  }

  onUpdateHours(event: Event)
  {
    this.hours = (<HTMLInputElement>event.target).value;
  }

  onUpdateComment(event: Event)
  {
    this.comment = (<HTMLInputElement>event.target).value;
  }

  onUpdateCoast(event: Event)
  {
    this.coast = (<HTMLInputElement>event.target).value;
  }

  onUpdateDate(event: Event)
  {
    this.date = (<HTMLInputElement>event.target).value;
  }
}
