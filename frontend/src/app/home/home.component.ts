import { Component, OnInit } from '@angular/core';
import {SearchComponent} from "../search/search.component";
import{ VehiclesService} from "../../vehicle-service/vehicle.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public vehcilesDetail: any = [];

  constructor(private request: VehiclesService) {


  }

  ngOnInit(): void {
  }




}
