import { Component, OnInit } from '@angular/core';


import {VehiclesService} from '../../vehicle-service/vehicle.service';
import {ApiRequestService} from '../API-request/api-request.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  navbarOpen = false;
  displayHeader = false;

  constructor(public apiRequest: ApiRequestService){ }

  ngOnInit(): void {
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }

  display(){
    if(this.apiRequest.assetDetails.length>0){
      this.displayHeader = true;
    }
    return this.displayHeader;
  }
}

