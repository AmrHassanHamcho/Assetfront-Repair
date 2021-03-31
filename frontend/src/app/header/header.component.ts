import {Component, Injectable, OnInit} from '@angular/core';

import {VehiclesService} from '../../vehicle-service/vehicle.service';
import {ApiRequestService} from '../API-request/api-request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  displayHeader = false;
  constructor(
    public request: ApiRequestService,
    public service: VehiclesService,
    ){ }

  ngOnInit(): void {
  }
  displayFalse(){
    this.service.AcceptOrDenied = false;
  }

  display(){
    if (this.service.AcceptOrDenied === true && this.request.assetDetails.length > 0){
      this.displayHeader = true;
    }
    else {
      this.displayHeader = false;
    }
    return this.displayHeader;
  }
}

