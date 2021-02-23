
import {Component, OnInit} from '@angular/core';
import {VehiclesService} from '../../vehicle-service/vehicle.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public vehcilesDetail: any = [];
  public errorMsg: string;

  constructor(private request: VehiclesService) {
  }

  ngOnInit(): void {
  }
/**
 * @param value of serial number entered by a user
 */
  setSerialNo(value: string): void {
    if (value) { // calls request.getVehicleData() if and only if the value is entered
      // if not does nothing
      this.request.getVehicleData(value)
        // assigns deta recieved from observable to this local SearchComponent property
        .subscribe(data => this.vehcilesDetail = data);
    }
  }



}

