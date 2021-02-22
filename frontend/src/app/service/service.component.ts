import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  selectedFile = null;
  comment = '';
  hours = '';
  coast = '';
  date = '';
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelect(event){
    console.log(event);
  }
  onFileUpload(){

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
