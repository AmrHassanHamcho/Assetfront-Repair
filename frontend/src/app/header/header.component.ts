import {Component, Injectable, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {VehiclesService} from '../../vehicle-service/vehicle.service';
import {ApiRequestService} from '../API-request/api-request.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  navbarOpen = false;
  displayHeader = false;
  AcceptOrDenied = false;

  constructor(
    public request: ApiRequestService,
    private router: Router,
    ){ }

  ngOnInit(): void {
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }
  acceptRequest(){
    return this.AcceptOrDenied = true;
  }
  display(){
    if (this.request.assetDetails.length > 0){
      this.displayHeader = true;
    }
    else {
      this.displayHeader = false;
    }
    return this.displayHeader;
  }
}

