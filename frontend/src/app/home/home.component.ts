import { Component, OnInit } from '@angular/core';
import {SearchComponent} from '../search/search.component';
import { VehiclesService} from '../../vehicle-service/vehicle.service';
import {ApiRequestService} from '../API-request/api-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public request: ApiRequestService,
    public vehicle: VehiclesService,
  ) { }

  ngOnInit(): void {
  }

  exportTCR(): void {
    alert('Export TCR');
  }

  exportInspection(): void {
    alert('Export Inspection');
  }

  exportService(): void {
    alert('Export Service');
  }
}
