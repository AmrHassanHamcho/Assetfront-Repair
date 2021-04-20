import { Component, OnInit } from '@angular/core';
import { VehiclesService} from '../../vehicle-service/vehicle.service';
import {ApiRequestService} from '../API-request/api-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  workingPlaceholder = '../../assets/images/default-image.jpg';
  constructor(
    public request: ApiRequestService,
    public vehicle: VehiclesService,
  ) { }

  ngOnInit(): void {
  }

  onLoaded(isFallback: boolean) {
    console.log(isFallback);
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
