import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';
import {Router} from '@angular/router';
import {TcrService} from './tcr.service';
import {FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-tcr',
  templateUrl: './tcr.component.html',
  styleUrls: ['./tcr.component.scss']
})
export class TcrComponent implements OnInit,  AfterViewChecked {
  color: 'lightblue'; // ripple effect color
  constructor(public request: ApiRequestService,
              private router: Router,
              public tcr: TcrService,
              private formBuilder: FormBuilder,
              private changeRef: ChangeDetectorRef,
              ) {
  }

  all = []; // place holder for checkpoint
  allSelected = false; // All checkpoint selected false at the beginning
  searchedSerialNo: boolean;
  tcrCopy = this.request.getAssetDetails()[0]; // copy of the TCR
  ngOnInit(): void {

  }
  /**@return searchedSerialNo, it returns true if tcrCopy has a value
   * i.e if the desired value is fetched from the API,false otherwise
   */
  onSuccessfulSearch(): boolean {
    if (this.tcrCopy === undefined) {
      this.searchedSerialNo = false;
      return this.searchedSerialNo;

    } else {
      this.searchedSerialNo = true;
      return this.searchedSerialNo;
    }
  }
/**@param value a radiobutton value selected by user
 * @param indexTcr a TCR index where the user selected a radiobutton
 * @param indexCp a checkpointIndex where the user selected a radiobutton
 * The value of checkpoint at a given index of tcrCopy at a given index
 * would be updated by the value a user selects from radio button
 */
  updateValue(value: number, indexTcr: number, indexCp: number ) {
  this.tcrCopy.tcr[indexTcr].checkpoint[indexCp].value = value;
  return this.tcrCopy.tcr[indexTcr].checkpoint[indexCp].value;
  }
/** @return the newly filled tcr
 */
  getNewlyFilledTcr() {
  return   this.tcr.setTcr(this.tcrCopy);
  }
 /**redirect to personal-data component
  */
  personData() {
    this.router.navigate(['/tcr/personal-data']);
  }

  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
/** @param tcrIndex index of the tcr where user is selecting radiobutton
 * It loops through checkpoint of tcrCopy at desired index
 * and fills the array all[] with boolean which is false
 * If the value of checkpoint at currentIndex of tcrCopy of currentIndex
 * is greater than -1, i,e the user selected a radiobutton, then it updates the array all[]
 * at current index with boolean value which is true.
 * Finally it assigns the global variable allSelected with true or false, i.e
 * allSelected = true if all values in array all[] are true otherwise
 * allSelected = false
 */
  allCheckPointSelected(tcrIndex: number) {
    this.allSelected = false;
    this.all = [];
    for (let i = 0; i < this.tcrCopy.tcr[tcrIndex].checkpoint.length; i ++){
      this.all[i] = false;
      if (this.tcrCopy.tcr[tcrIndex].checkpoint[i].value > -1){
            this.all[i] = true;
          }
   }
    this.allSelected = this.all.every(v => v === true);
  }
  /*allFilled(){
    for (let tcri = 0; tcri < this.tcrCopy.tcr.length; tcri++){
      for ( let cpi = 0; cpi < this.tcrCopy.tcr[tcri].checkpoint.length; cpi ++){
        this.all[cpi] = false;
        if (this.tcrCopy.tcr[tcri].checkpoint[cpi].value > -1){
          this.all[cpi] = true;
        }
     }
    }
    this.allSelected = this.all.every(v => v === true);
}*/
  toHome() {
    this.router.navigate(['/home']);
  }

}
