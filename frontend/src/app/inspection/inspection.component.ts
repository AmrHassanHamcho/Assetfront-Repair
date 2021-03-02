import { Component, OnInit } from '@angular/core';

interface InspectionState {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements OnInit {
  inspectionStatus = '';
  selectedStatus: string;
  selectedFile: File = null;
  date = '';


  constructor() { }

  ngOnInit(): void {
  }

  onFileSelect(event){
    console.log(event);
    this.selectedFile =<File>event.target.files[0];
  }
  onFileUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile,this.selectedFile.name);
    //this.http.post(url,fd) // any backend function that accepts foreign data, in our case AWS url
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
  onUpdateDate(event: Event)
  {
    this.date = (<HTMLInputElement>event.target).value;
  }


  inspectionStates: InspectionState[] = [
    {value: 'Good', viewValue: 'Good'},
    {value: 'Excellent', viewValue: 'Excellent'},
    {value: 'Bad', viewValue: 'Bad'}
  ];
}
