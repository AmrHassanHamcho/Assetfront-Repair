
import {Component, OnInit} from '@angular/core';
import {VehiclesService} from '../../vehicle-service/vehicle.service';
import {ApiRequestService} from "../API-request/api-request.service";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public request: ApiRequestService ) {
  }
  ngOnInit(): void {
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
  //}



}

