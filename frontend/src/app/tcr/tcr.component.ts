import { Component, OnInit } from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';

@Component({
  selector: 'app-tcr',
  templateUrl: './tcr.component.html',
  styleUrls: ['./tcr.component.scss']
})
export class TcrComponent implements OnInit {
  private i = 0;
  color: 'lightblue';
  val = [1, 1, 1];
  test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14];
  test2 = [1, 2, 3];
  searchedSerialNo: boolean;
  ttrCopy = this.request.getAssetDetails()[0];
  x: number;
  constructor(public request: ApiRequestService) {
  }

  ngOnInit(): void {
  }
  onSuccessfulSearch(): boolean {
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
      this.x = this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value;
      return this.x;
  }
  logToconsole(indexTcr: number, indexCp: number){
    console.log(this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value);
  }
  getNewValue(){
    for (let i = 0; i < this.ttrCopy.tcr.length; i++){
    return this.ttrCopy.tcr[i].checkpoint[0].value;
    }
  }
  printHeleArray(){
 console.log(this.ttrCopy);
  }
}


