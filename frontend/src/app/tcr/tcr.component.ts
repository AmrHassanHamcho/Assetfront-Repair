import {AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChildren} from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';
import {Router} from '@angular/router';
import {TcrService} from './tcr.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tcr',
  templateUrl: './tcr.component.html',
  styleUrls: ['./tcr.component.scss']
})
export class TcrComponent implements OnInit,  AfterViewChecked {
  color: 'lightblue';
  constructor(public request: ApiRequestService,
              private router: Router,
              public tcr: TcrService,
              private formBuilder: FormBuilder,
              private changeRef: ChangeDetectorRef) {
  }

  abdi = false;
  all = [];
   teller = 0;

  allSelected = false;

  searchedSerialNo: boolean;
  ttrCopy = this.request.getAssetDetails()[0];

  tests = [];
  registerForm = this.formBuilder.group({
    selected: ['', [Validators.required]]

  });

  /*allFilled() {
     for (const t of this.ttrCopy.tcr) {
       for (const cp of t.checkpoint) {
         t.checkpoint.forEach((c, index) => {
           this.all[index] = false;
           if (cp[index].value > -1) {
             this.all[index] = true;
           }
         });
       }
       this.allSelected = this.tests.every(v => v === true);
     }
   }
*/
  notFilled = '';
 /* hide = true;
  indexCp = 0;
  counter = 0;

  addCounter() {
    this.counter += 1;
  }*/
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

  updateValue(value: number, indexTcr: number, indexCp: number ) {
  this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value = value;
    // this.allFilled();
   // this.selectedTrigger();
    /*this.tcrIndex = indexTcr;
    this.checkPointIndex = indexCp;
    this.indexCp = indexCp;
    this.hide = false;*/
    // this.selected(indexTcr, this.ttrCopy.tcr[indexTcr].checkpoint.length);
    /* if (this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value > -1 &&
          indexCp !== this.checkPointIndex){
              this.counter ++;
            }


        console.log('length of checkpoint : ' + this.ttrCopy.tcr[indexTcr].checkpoint.length);
        console.log('counter' + this.counter);

        if (this.counter === this.ttrCopy.tcr[indexTcr].checkpoint.length){
              console.log('amr kommmet hit');
              this.x = true;
              this.counter = 0;
        }
        if (indexTcr !== this.tcrIndex){
          console.log('we have come into tcr index');
          this.counter = 0;
        }
        this.checkPointIndex = indexCp;
        this.tcrIndex = indexTcr;
       */
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
/*
  allFilled() {
    /!* let counter = 0;
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
 *!/      //  this.allSelected = this.tests.every(v => v === true);
    // console.log(this.tests);
    // tslint:disable-next-line:prefer-for-of
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
  }*/
/*
  selectedTrigger(){
    for (let itcr = 0; itcr < this.ttrCopy.tcr.length; itcr++){
      for (let cp = 0; cp < this.ttrCopy.tcr[itcr].checkpoint; cp++){
        if (this.ttrCopy.tcr[itcr].checkpoint[cp].value > -1){
          this.x = true;
        }
      }
    }
<<<<<<< HEAD
=======
    this.allSelected = this.tests.every(v => v === true);
    return this.allSelected;
>>>>>>> 03e75d6a7ff00afc8fda17740f0859e02c0923df
  }
*/
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
 /* selected(indextcr: number, indexCp: number) {
    for (let i = 0; i < indextcr; i++){
      for (let j = 0; j < indexCp; j++){
        this.tests[j] = false;
        if (this.ttrCopy.tcr[indextcr].checkpoint[j].value > -1){
          this.tests[j] = true;
        }
      }

    }
    this.abdi = this.tests.every(v => v === true);
  }
  tickCounter() {
    this.teller++;
  }
  logtoConsole(){
    console.log('ajab ' + this.teller++);
  }
 */ /*selectedCp(tcri: number, cpi: number){
    for (let i = 0; i < cpi; i++){
      this.tests[i] = false;
      if (this.ttrCopy.tcr[tcri].checkpoint.value > -1){
        this.tests[i] = true;
      }
    }
 //   this.allSelected = this.tests.every(v => v === true);
    console.log('Selected: ' + this.allSelected);
  }*/
/* count(i: number) {
      return new Array(i);
  }*/
  good(tcri: number) {
    this.abdi = false;
    this.tests = [];
    for ( let i = 0; i < this.ttrCopy.tcr[tcri].checkpoint.length; i ++){
      this.tests[i] = false;
      if (this.ttrCopy.tcr[tcri].checkpoint[i].value > -1){
            this.tests[i] = true;
          }
   }
    this.abdi = this.tests.every(v => v === true);
  }
  allFilled(){
    for (let tcri = 0; tcri < this.ttrCopy.tcr.length; tcri++){
      for ( let cpi = 0; cpi < this.ttrCopy.tcr[tcri].checkpoint.length; cpi ++){
        this.all[cpi] = false;
        if (this.ttrCopy.tcr[tcri].checkpoint[cpi].value > -1){
          this.all[cpi] = true;

        }

      }

    }
    this.allSelected = this.all.every(v => v === true);

  }

  setNotFilled(notFilled: string) {
    this.notFilled = notFilled;

  }

  toHome() {
    this.router.navigate(['/home']);
  }
}
