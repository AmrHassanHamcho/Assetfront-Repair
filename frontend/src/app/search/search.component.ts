import {Component, Input, OnInit} from '@angular/core';
import {VehiclesService} from '../vehicle.service';
import {Test1Service} from "../test1.service";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public vehcilesDetail: any = [];

  constructor(private request: VehiclesService, public ser: Test1Service) {
  }

  ngOnInit(): void {
  }

  public serieNo : string;
  setSerialNo(value: string): void {
    if (value) {
      this.request.getVehicleData(value)
        // assigns deta recieved from observable to this local SearchComponent property
        .subscribe(data => this.vehcilesDetail = data);
      this.ser.setSer(value);
    }
  }



  //getProductId(){
    //return this.vehcilesDetail.productClass.id;
  //}

}

