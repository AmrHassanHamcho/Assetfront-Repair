import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

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
  constructor(private http: HttpClientModule) { }

  ngOnInit(): void {
  }

  onFileSelect(event){
    console.log(event);
    this.selectedFile = (event.target.files[0] as File);
  }
  onFileUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    // this.http.post(url,fd) // any backend function that accepts foreign data, in our case AWS url
    // .subscribe(event=> {
    // msg to usr
    // or log to console: console.log(event)
    // })



    // in case we want to track the progress of the file upload

    // this.http.post(url,fd, {
    //  reportProgress: true,
    //  observe: 'events'
    //
    //
    // })
  }

  onUpdateHours(event: Event)
  {
    this.hours = (event.target as HTMLInputElement).value;
  }

  onUpdateComment(event: Event)
  {
    this.comment = (event.target as HTMLInputElement).value;
  }

  onUpdateCoast(event: Event)
  {
    this.coast = (event.target as HTMLInputElement).value;
  }

  onUpdateDate(event: Event)
  {
    this.date = (event.target as HTMLInputElement).value;
  }
}
