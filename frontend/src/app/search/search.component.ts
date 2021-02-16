import {Component, OnInit} from '@angular/core';
import {VehiclesService} from '../../vehicle-service/vehicle.service';
import {catchError} from 'rxjs/operators';
import {of, pipe} from 'rxjs';

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

  setSerialNo(value: string): void {
    if ( value) {
      this.request.getVehicleData(value)
        // assigns deta recieved from observable to this local SearchComponent property
        .subscribe(data => this.vehcilesDetail = data);
      catchError(error => {
          this.errorMsg = error.message;
          return of([]);
        });
    }
  }

}

