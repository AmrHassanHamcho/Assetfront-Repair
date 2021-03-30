import { Component, OnInit } from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';
import {PersonalDataComponent} from './personal-data/personal-data.component';
import {Router} from '@angular/router';
import {TcrService} from './tcr.service';

@Component({
  selector: 'app-tcr',
  templateUrl: './tcr.component.html',
  styleUrls: ['./tcr.component.scss']
})
export class TcrComponent implements OnInit {
  private allSelected = false;
  constructor(public request: ApiRequestService,
              private router: Router,
              public tcr: TcrService) {
  }

  searchedSerialNo: boolean;
  color = 'lightblue';
  ttrCopy = this.request.getAssetDetails()[0];
  // logToconsole(indexTcr: number, indexCp: number){
  // console.log(this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value);
  // }
  tests = [];

  ngOnInit(): void {
  }

  onSuccessfullSearch(): boolean {
    if (this.ttrCopy === undefined) {
      this.searchedSerialNo = false;
      return this.searchedSerialNo;

    } else {
      this.searchedSerialNo = true;
      return this.searchedSerialNo;

    }
  }

  updateValue(value: number, indexTcr: number, indexCp: number) {
    this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value = value;
    return this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value;
  }

  printHeleArray() {
    // console.log(this.ttrCopy);
    this.tcr.setTcr(this.ttrCopy);
  }

  personData() {
    // if (this.allFilled())  {
      this.router.navigate(['/tcr/personal-data']);
    // }
  }

  allFilled() {
    for (const tcr of this.ttrCopy.tcr) {
      for (const cp of tcr.checkpoint) {
        if (cp.value > 0) {
          this.tests.push(true);
        } else {
          this.tests.push(false);
        }
      }
    }
    this.allSelected = this.tests.every(v => v === false);
    return this.allSelected;
  }
}

