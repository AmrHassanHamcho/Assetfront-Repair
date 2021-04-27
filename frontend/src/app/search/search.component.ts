import {Component, OnInit} from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogWindowComponent} from './dialog-window/dialog-window.component';
import {VehiclesService} from '../../vehicle-service/vehicle.service';

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

   setSerialNo(value: string) {
     const regExpr = new RegExp(/^[A-Za-z0-9]/);
     if (value.match(regExpr)) {
       try {
         this.request.setSerialNo(value).then(r => {
           if (this.request.assetDetails.length > 0) {
           this.openDialog();
           }
           else {
           this.errorMessage = 'Invalid VIN(Vehicle Identification Number)';
           }
           });
       } catch (error){
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
