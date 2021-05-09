import { Injectable } from '@angular/core';
import {VehiclesService} from '../vehicle-service/vehicle.service';

/**
 * Injectable service to perform the API request
 * and fetching the Serial number value
 */

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  public assetDetails: any = []; // array to hold response body
    constructor(private request: VehiclesService) { }

  /**
   * This is a Setter function which fetches the value from the API
   * @param value is the serial number value
   * @return returns a promise so that all values are fetched before using it.
   */

setSerialNo(value){
  const promise = new Promise((resolve, reject) => {
  this.request.getVehicleData(value)
   .toPromise()
   .then( resp => {
   if (resp.status === 200) {
     this.assetDetails = resp.body; // assign assetDetails to response body
     resolve();
   }
   } )
   .catch((error) => {console.log(error );
                      reject(error);
   });
  });
  return promise;
   }

  /**
   * @return getter that returns asset Details
   */
  getAssetDetails() {
    return this.assetDetails;
  }
}
