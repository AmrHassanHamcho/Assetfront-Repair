import { Injectable } from '@angular/core';
import {VehiclesService} from '../../vehicle-service/vehicle.service';


/**
 * Injectable service to perform the API request
 * and fetching the Serial number value
 */


@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  public assetDetails: any = [];
  private submitButtonPressed = false;
  private errorMessage = '';
  private statusCode: number;
  public successfulRequest = false;
  constructor(private request: VehiclesService) { }

  /**
   * This is a Setter function which fetches the value from the API
   * @param value is the serial number value
   */


  setSerialNo(value: string): void {
    if (value) { // calls request.getVehicleData() if and only if the value is entered
      // if not does nothing
      this.request.getVehicleData(value)
        // assigns data received from observable to this local SearchComponent property
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

  /**
   * @return getter that return asset Details
   */

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
