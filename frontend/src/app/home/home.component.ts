import { Component, OnInit } from '@angular/core';
import { VehiclesService} from '../../vehicle-service/vehicle.service';
import {ApiRequestService} from '../API-request/api-request.service';
import {FileServiceService} from "../fileService/file-service.service";
import { createPopper } from '@popperjs/core';
import {HomeService} from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data : any;
  workingPlaceholder = '../../assets/images/default-image.jpg';
  public commonPrefix;
  private prefix: any;
  constructor(
    public apiRequest: ApiRequestService,
    public vehicle: VehiclesService,
    public fileService: FileServiceService,
    public home : HomeService,
  ) {

  }

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
    this.home.getListObject('Service');
    this.prefix = this.home.lastModified;
    console.log('this is prefix' + this.prefix);
    if(this.prefix !== ''){
      const params = { // Bucket info
        Bucket: 'asset-repair' ,
        Delimiter: '/',
        Prefix: this.prefix,
      }
      this.home.listFiles(params);

    }

    else {
      console.log("error");
    }



  }


}
