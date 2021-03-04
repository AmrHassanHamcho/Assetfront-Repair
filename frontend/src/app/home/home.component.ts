import { Component, OnInit } from '@angular/core';
import {SearchComponent} from '../search/search.component';
import { VehiclesService} from '../../vehicle-service/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private request: VehiclesService) { }

  ngOnInit(): void {
  }
}
