import { Injectable } from '@angular/core';
import {VehiclesService} from "../../vehicle-service/vehicle.service";


@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  public assetDetails: any = [];
  private errorMessage = '';
  constructor(private request: VehiclesService) { }

  setSerialNo(value: string): void {
    if (value) { // calls request.getVehicleData() if and only if the value is entered
      // if not does nothing
      this.request.getVehicleData(value)
        // assigns deta recieved from observable to this local SearchComponent property
        .subscribe(data => this.assetDetails = data);
      this.invalidSerialNo();

    }
  }
  invalidSerialNo(){
    if(this.assetDetails.length<=0)
    this.errorMessage = 'Invalid Serial number, please try again!';

  }
getErrorMessage(){
  return this.errorMessage;
}
}
