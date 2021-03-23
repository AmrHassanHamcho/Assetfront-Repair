import { Component, OnInit } from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';

@Component({
  selector: 'app-tcr',
  templateUrl: './tcr.component.html',
  styleUrls: ['./tcr.component.scss']
})
export class TcrComponent implements OnInit {
  searchedSerialNo: boolean;
  color = 'lightblue';
  ttrCopy = this.request.getAssetDetails()[0];
   constructor(public request: ApiRequestService) {
  }

  ngOnInit(): void {
  }
  onSuccessfullSearch(): boolean {
    if (this.ttrCopy === undefined){
      this.searchedSerialNo = false;
      return this.searchedSerialNo;

    }else
    {
      this.searchedSerialNo = true;
      return this.searchedSerialNo;

    }
  }
  updateValue(value: number, indexTcr: number, indexCp: number){
      this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value = value;
      return  this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value;
   }
  // logToconsole(indexTcr: number, indexCp: number){
    // console.log(this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value);
  // }
printHeleArray(){
 console.log(this.ttrCopy);
  }
}


