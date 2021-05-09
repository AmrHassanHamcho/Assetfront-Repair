import { Component, OnInit } from '@angular/core';
import { VehiclesService} from '../vehicle-service/vehicle.service';
import {ApiRequestService} from '../API-request/api-request.service';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;
  workingPlaceholder = '../../assets/images/default-image.jpg';
  /**
   * Bool variable to display download service div
   */
  public displayService = false;
  /**
   * Bool variable to display download inspection div
   */
  public displayInspection = false;
  /**
   * Bool variable to display download TCR div
   */
  public displayTCR = false;


  constructor(
    public apiRequest: ApiRequestService,
    public vehicle: VehiclesService,
    public home: HomeService,
  ) {
  }

  ngOnInit(): void {
  }

  onLoaded(isFallback: boolean) {
    console.log(isFallback);
  }

  /**
   * Function that displays the latest TCR for the user to download
   */
  downloadTCR(): void {
    this.home.getListObject('TCR'); // Lists Objects in Report folder in Latest TCR
    //open and close download div
    if (this.displayTCR){
      this.displayTCR   = false;
    }
    else{
      this.displayTCR  = true;
      this.displayInspection = false;
      this.displayService = false;
    }
  }
  /**
   * Function that displays the latest TCR for the user to download
   */
  downloadInspection(): void {
    this.home.getListObject('Inspection');// Lists Objects in Report folder in Latest inspection
    //open and close download div
    if (this.displayInspection){
      this.displayInspection  = false;
    }
    else{
      this.displayInspection = true;
      this.displayTCR   = false;
      this.displayService = false;
    }
  }

  /**
   * Function that displays the latest TCR for the user to download
   */
  downloadService(): void {
    this.home.getListObject('Service');// Lists Objects in Report folder in Latest service
    //open and close download div
    if (this.displayService){
      this.displayService  = false;
    }
    else{
      this.displayService = true;
      this.displayInspection = false;
      this.displayTCR = false;
    }
  }


}
