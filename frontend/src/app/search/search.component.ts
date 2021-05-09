import {Component, OnInit} from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogWindowComponent} from './dialog-window/dialog-window.component';
import {VehiclesService} from '../vehicle-service/vehicle.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  errorMessage = ''; // Nothing to display in the beginning

  constructor(
    public request: ApiRequestService,
    private dialog: MatDialog,
    public vehicle: VehiclesService,
  ) {
  }

  qrResultString: string; // scanned value
  show = false; // hide the camera
  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogWindowComponent, {
      data: {},
      panelClass: 'my-custom-dialog-class'
    });
  }
/*** Toggles the Qr-window's div by changing the hide value to true or false
 * */
  showDiv(){
    if (!this.show){
      this.show = true;
    }
    else{
      this.show = false;
    }
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString; // Assign the scanned value to qrResultString
    this.show = false; // hide the camera
    (document.getElementById('Search_id') as HTMLInputElement).value = resultString;
  }

   setSerialNo(value: string) {
     const regExpr = new RegExp(/^[A-Za-z0-9]/); // allowed characters A-Z , a-z, 0-9
     if (value.match(regExpr)) {
       try {
         this.request.setSerialNo(value).then(() => {
           if (this.request.assetDetails.length > 0) { // open dialog window if the vehicle is found
           this.openDialog();
           }
           else {
             // wrong VIN entered
           this.errorMessage = 'Invalid VIN(Vehicle Identification Number)';
           }
           });
       } catch (error){
       }
     }
   }

   inputValidation($event: KeyboardEvent): boolean{
    // Validate user input
    const regExpr = new RegExp(/^[A-Za-z0-9]/);
    if ($event.key.match(regExpr)) {
      return true;
    } else {
      return false;
    }
  }
}
