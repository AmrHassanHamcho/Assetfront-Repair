import { Component, OnInit } from '@angular/core';



import {VehiclesService} from '../../vehicle-service/vehicle.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;


  constructor() {


  }
  ngOnInit(): void {
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }
}


