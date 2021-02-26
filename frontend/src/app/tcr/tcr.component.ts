import { Component, OnInit } from '@angular/core';
import { CheckPoint } from "../checkPoint/checkPoint";
import {SearchComponent} from "../search/search.component";
import {VehiclesService} from "../../vehicle-service/vehicle.service";
import {ApiRequestService} from "../API-request/api-request.service";


@Component({
  selector: 'app-tcr',
  templateUrl: './tcr.component.html',
  styleUrls: ['./tcr.component.css']
})
export class TcrComponent implements OnInit {

  private id : number;
  private name : string;
  private cp = new CheckPoint();
  private checkPoint :CheckPoint[];
  private tcr = [this.checkPoint];


  constructor(public request: ApiRequestService ) {
  }

  ngOnInit(): void {
  }


  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

}
