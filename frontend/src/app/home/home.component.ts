import { Component, OnInit } from '@angular/core';
import { VehiclesService} from '../../vehicle-service/vehicle.service';
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
  displayService = false;
  public displayInspection =  false;
  public displayTCR = false;
  public emptyArray = false;

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

  downloadTCR(): void {
    this.home.getListObject('TCR');
    if (this.displayTCR){
      this.displayTCR   = false;
    }
    else{
      this.displayTCR  = true;
      this.displayInspection = false;
      this.displayService = false;
    }
  }

  downloadInspection(): void {
    this.home.getListObject('Inspection');

    if (this.displayInspection){
      this.displayInspection  = false;
    }
    else{
      this.displayInspection = true;
      this.displayTCR   = false;
      this.displayService = false;
    }
  }

  downloadService(): void {
    this.home.getListObject('Service');

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
