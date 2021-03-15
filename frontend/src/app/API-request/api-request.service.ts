import { Injectable } from '@angular/core';
import {VehiclesService} from '../../vehicle-service/vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  public assetDetails: any = [];
  submitButtonPressed = false;
  errorMessage = '';
  statusCode: number;
  successfulRequest = false;
  constructor(private request: VehiclesService) { }

  setSerialNo(value: string): void {
    if (value) { // calls request.getVehicleData() if and only if the value is entered
      // if not does nothing
      this.request.getVehicleData(value)
        // assigns data recieved from observable to this local SearchComponent property
        .subscribe(resp => {
          this.statusCode = resp.status;
          this.assetDetails = resp.body;
          const statusText = resp.statusText;
          if (statusText === 'OK') {
            this.successfulRequest = true;
          }
          console.log(statusText);
        });
      this.submitButtonPressed = true;
    }
  }

  getAssetDetails() {
    return this.assetDetails;
  }
  /**
   * @return return the error message( empty string if correct serialNo entered )
   */
  getErrorMessage(){
    if (this.successfulRequest){
      this.errorMessage = 'Invalid input. Please try again!';

    }
    return this.errorMessage; }
  /**
   * @return returns true if statuaText is 'OK' false otherwise
   */
  getSuccessfulRequest(){
    return this.successfulRequest;
  }
}
