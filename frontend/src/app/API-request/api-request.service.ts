import { Injectable } from '@angular/core';
import {VehiclesService} from '../../vehicle-service/vehicle.service';


@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  public assetDetails: any = [];
  submitButtonPressed = false;
  private errorMessage = 'Invalid input! please try again';
  constructor(private request: VehiclesService) { }

  setSerialNo(value: string): void {
    if (value) { // calls request.getVehicleData() if and only if the value is entered
      // if not does nothing
      this.request.getVehicleData(value)
        // assigns data recieved from observable to this local SearchComponent property
        .subscribe(data => this.assetDetails = data);
      this.submitButtonPressed = true;
    }

  }
  getAssetDetails() {
    return this.assetDetails;
  }
  invalidSerialNo(){
    if (this.getSubmitButtonPressed() && this.getAssetDetails().length <= 0) {
      console.log(this.assetDetails);
    }  }
  getSubmitButtonPressed(){
    return this.submitButtonPressed;
  }

  getErrorMessage(){
    return this.errorMessage;
  }

}
