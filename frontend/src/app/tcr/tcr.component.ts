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

  all = [];
  allSelected = false;
  searchedSerialNo: boolean;
  ttrCopy = this.request.getAssetDetails()[0];

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

  updateValue(value: number, indexTcr: number, indexCp: number ) {
  this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value = value;
  return this.ttrCopy.tcr[indexTcr].checkpoint[indexCp].value;
  }

  printHeleArray() {
    this.tcr.setTcr(this.ttrCopy);
  }

  personData() {
    this.router.navigate(['/tcr/personal-data']);
  }

  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
  good(tcri: number) {
    this.allSelected = false;
    this.all = [];
    for ( let i = 0; i < this.ttrCopy.tcr[tcri].checkpoint.length; i ++){
      this.all[i] = false;
      if (this.ttrCopy.tcr[tcri].checkpoint[i].value > -1){
            this.all[i] = true;
          }
   }
    this.allSelected = this.all.every(v => v === true);
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
  toHome() {
    this.router.navigate(['/home']);
  }
}
