import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../vehicle-service/vehicle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;

  constructor(public ser: VehiclesService) {

  }
  ngOnInit(): void {
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }
}


