import { Component, OnInit } from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';
import {PersonalDataComponent} from './personal-data/personal-data.component';
import {Router} from '@angular/router';
import {TcrService} from './tcr.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tcr',
  templateUrl: './tcr.component.html',
  styleUrls: ['./tcr.component.scss']
})
export class TcrComponent implements OnInit {
  constructor(public request: ApiRequestService,
              private router: Router,
              public tcr: TcrService,
              private formBuilder: FormBuilder) {
  }

  allSelected = false;

  searchedSerialNo: boolean;
  color = 'lightblue';
  ttrCopy = this.request.getAssetDetails()[0];
  // logToconsole(indexTcr: number, indexCp: number){
  // console.log(this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value);
  // }
  tests = [];
  registerForm = this.formBuilder.group({
    selected: ['', [Validators.required]]

  });

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
    this.allFilled();
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
    /* let counter = 0;
     let checker = [];
     let b = false;
     for (const t of this.ttrCopy.tcr) {
      // for (const cp of t.checkpoint) {
       t.checkpoint.forEach((cp, index) => {
         if (cp[index].value >= 0) {
           this.tests[index] = true;
         }else {
           this.tests[index] = false;

         }     });
         }
     console.log('*****' + this.tests);

   }
 */      //  this.allSelected = this.tests.every(v => v === true);
    // console.log(this.tests);
    for(let tcrI = 0; tcrI < this.ttrCopy.tcr.length; tcrI++){
      for (let cpi = 0; cpi < this.ttrCopy.tcr[tcrI].checkpoint.length; cpi++){

        if (this.ttrCopy.tcr[tcrI].checkpoint[cpi].value >= 0){
          console.log('******************' + cpi);

          this.tests.push(true);
        }else {
          this.tests[cpi] = false;
        }
      }
    }
    console.log(this.tests);
  }
}
