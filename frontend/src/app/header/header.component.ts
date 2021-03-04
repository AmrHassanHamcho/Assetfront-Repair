import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  goHome = false;

  constructor(public apiRequest: ApiRequestService, private router: Router){ }

  ngOnInit(): void {
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }

  display(){
    if (this.apiRequest.assetDetails.length > 0){
      this.displayHeader = true;
      this.goToHome();
    }
    return this.displayHeader;
  }

  goToHome(){
      this.router.navigate(['/home']);
  }
}

