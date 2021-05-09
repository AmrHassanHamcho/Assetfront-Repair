import { Component, OnInit } from '@angular/core';
import { VehiclesService} from '../../vehicle-service/vehicle.service';
import {ApiRequestService} from '../API-request/api-request.service';
import {FileServiceService} from '../fileService/file-service.service';
import { createPopper } from '@popperjs/core';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;
  workingPlaceholder = '../../assets/images/default-image.jpg';
  public commonPrefix;
  private prefix: any;
  displayService = false;
  public displayInspection =  false;
  public displayTCR = false;
  public emptyArray = false;

  constructor(
    public apiRequest: ApiRequestService,
    public vehicle: VehiclesService,
    public fileService: FileServiceService,
    public home: HomeService,
  ) {
    // this.home.listFiles('Service');
    // this.home.setCommonPreFixes('Service');
    // this.home.setCommonPreFixes('Inspection');
    // this.home.setCommonPreFixes('TCR');

  }

  ngOnInit(): void {
  }

  onLoaded(isFallback: boolean) {
    console.log(isFallback);
  }

  downloadTCR(): void {
    this.home.getListObject('TCR');
    if (this.displayTCR){
      this.displayTCR   = false;
    }
    else{
      this.displayTCR  = true;
      this.displayInspection = false;
      this.displayService = false;
    }
  }

  downloadInspection(): void {
    this.home.getListObject('Inspection');

    if (this.displayInspection){
      this.displayInspection  = false;
    }
    else{
      this.displayInspection = true;
      this.displayTCR   = false;
      this.displayService = false;
    }


  }


  downloadService(): void {
    this.home.getListObject('Service');

    if (this.displayService){
      this.displayService  = false;
    }
    else{
      this.displayService = true;
      this.displayInspection = false;
      this.displayTCR = false;
    }
    //
    // if(this.home.arrayOfFiles.length > 0){
    //   this.fullArray = true;
    // }

   // this.home.listFiles('Service');
    // this.home.getData();
    // this.home.getListObject('Service');
    // this.prefix = this.home.lastModified;
    // console.log('this is prefix' + this.prefix);
    // if(this.prefix !== ''){
    //   const params = { // Bucket info
    //     Bucket: 'asset-repair' ,
    //     Delimiter: '/',
    //     Prefix: this.prefix,
    //   }
    //   this.home.listFiles(params);
    //
    // }
    //
    // else {
    //   console.log("error");
    // }
  }


}
