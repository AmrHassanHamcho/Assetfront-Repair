import {Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild} from '@angular/core';

import {ApiRequestService} from '../API-request/api-request.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DialogWindowComponent} from './dialog-window/dialog-window.component';
import {VehiclesService} from '../../vehicle-service/vehicle.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  errorMessage = '';

  constructor(
    public request: ApiRequestService,
    private dialog: MatDialog,
    public vehicle: VehiclesService,
  ) {
  }

  qrResultString: string;
  ShowHide = false;
  loading = false;
  ngOnInit(): void {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    //  dialogConfig.autoFocus = true;
    this.dialog.open(DialogWindowComponent, dialogConfig);

  }

  showDiv(){
    if (!this.ShowHide){
      this.ShowHide = true;
    }
    else{
      this.ShowHide = false;
      console.log(this.ShowHide);
    }
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    (document.getElementById('Search_id') as HTMLInputElement).value = resultString;

  }
/*

/!**
 * @param value of serial number entered by a user
 // tslint:disable-next-line:jsdoc-format
 // setSerialNo(value: string): void {
            // tslint:disable-next-line:jsdoc-format
            if (value) { // calls request.getVehicleData() if and only if the value is entered
         // tslint:disable-next-line:jsdoc-format
         //     // if not does nothing
         //     this.request.getVehicleData(value)
 assigns deta recieved from observable to this local SearchComponent property
.subscribe(data => this.vehcilesDetail = data); }
 }
**!/
*/

   setSerialNo(value: string)
   {
     const regExpr = new RegExp(/^[A-Za-z0-9]/);
     if (value.match(regExpr))
     {
       this.loading = true;
       try {
         this.request.setSerialNo(value).then(r =>
         {
           this.loading = false;
           if (this.request.assetDetails.length > 0) {
           this.openDialog();
           }
           else {
           this.errorMessage = 'Invalid VIN(Vehicle Identification Number)';
           }
           });
       } catch (error){
           console.log(error + 'From Test');
       }
     }
   }
   inputValidation($event: KeyboardEvent): boolean{
           const regExpr = new RegExp(/^[A-Za-z0-9]/);
           console.log($event.key);
           if ($event.key.match(regExpr)) {
           return true;
           } else {
           return false;
           }
           }
 }
