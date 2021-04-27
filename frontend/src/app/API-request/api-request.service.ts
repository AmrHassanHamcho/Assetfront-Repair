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
  statusCode: number;
  public successfulRequest = false;
  private loading = false;
  constructor(private request: VehiclesService) { }

  /**
   * This is a Setter function which fetches the value from the API
   * @param value is the serial number value
   */



/*  test(value: string) {
     const regExpr = new RegExp(/^[A-Za-z0-9]/);
     if (value.match(regExpr)) {
         this.loading = true;
         try {
            this.request.setSerialNo(value).then(r => {
                   this.loading = false;
                   if (this.request.statusCode !== 200) {
                   console.log( 'this.request.statusCode');
                     }else {  if (this.request.assetDetails.length > 0) {
                      this.openDialog();
                     } else {
                      this.errorMessage = 'Invalid VIN(Vehicle Identification Number)';
                   }}
                });
           } catch (error){
              console.log(error + 'From Test');
            }
       }
    }*/



  // setSerialNo(value: string): void {
    // if (value) { // calls request.getVehicleData() if and only if the value is entered
    //   // if not does nothing
    //   this.request.getVehicleData(value)
    //     // assigns data received from observable to this local SearchComponent property
    //     .subscribe(resp => {
    //       this.statusCode = resp.status;
    //       this.assetDetails = resp.body;
    //       const statusText = resp.statusText;
    //       if (statusText === 'OK') {
    //         this.successfulRequest = true;
    //       }
    //       console.log(statusText);
    //     });
    //   this.submitButtonPressed = true;
    // }
 // }
/*setSerialNo(value){
  if (value) {
    return this.request.getVehicleData(value)
      .pipe()
      .toPromise()
      .then(resp => {
        this.assetDetails = resp.body;
        this.statusCode = resp.status;
        return this.assetDetails;
      });*/


 // }


// }
setSerialNo(value){
  const promise = new Promise((resolve, reject) =>

  {
  this.request.getVehicleData(value)
   .toPromise()
   .then( resp => {
   if (resp.status === 200) {
     this.assetDetails = resp.body;
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
