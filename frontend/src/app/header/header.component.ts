import {Component, Injectable, OnInit} from '@angular/core';

import {VehiclesService} from '../../vehicle-service/vehicle.service';
import {ApiRequestService} from '../API-request/api-request.service';
/*
* Header Component to handle the header of the website
*/

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public displayHeader = false;
  constructor(
    public request: ApiRequestService,
    public service: VehiclesService,
    ){ }

  ngOnInit(): void {
  }

  // Method to set the variable AcceptOrDenied to false
  displayFalse(){
    this.service.AcceptOrDenied = false;
  }

  /**
   * Function to check whether to display the header
   * @return displayHeader bool variable if the header is to be displayed
   */

  display(){
    if(this.service.AcceptOrDenied === true && this.request.assetDetails.length > 0){ //checks whether AcceptOrDenied variable is true and there is a vehicle retrieved by the API
      this.displayHeader = true;
    }
    else {
      this.displayHeader = false;
    }
    return this.displayHeader;
  }
}

