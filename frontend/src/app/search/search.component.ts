
import {Component, OnInit} from '@angular/core';
import {ApiRequestService} from '../API-request/api-request.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogWindowComponent} from './dialog-window/dialog-window.component';
import {VehiclesService} from '../../vehicle-service/vehicle.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    public request: ApiRequestService,
    private dialog: MatDialog,
    public vehicle: VehiclesService,
    ) {
  }

  ngOnInit(): void {

  }

  openDialog() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      this.dialog.open(DialogWindowComponent, dialogConfig);
  }
  /**
   * @param value of serial number entered by a user
   */

  // setSerialNo(value: string): void {
  //   if (value) { // calls request.getVehicleData() if and only if the value is entered
  //     // if not does nothing
  //     this.request.getVehicleData(value)
  //       // assigns deta recieved from observable to this local SearchComponent property
  //       .subscribe(data => this.vehcilesDetail = data);
  //
  //
  //   }

  // }


}
