import { Component, OnInit } from '@angular/core';
import {SearchComponent} from '../search/search.component';
import { VehiclesService} from '../../vehicle-service/vehicle.service';
import {ApiRequestService} from '../API-request/api-request.service';
import {FileServiceService} from "../fileService/file-service.service";
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data : any;

  constructor(
    public apiRequest: ApiRequestService,
    public vehicle: VehiclesService,
    public fileService: FileServiceService,
  ) {

  }

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

  getListObject() {
    const resourceId = this.apiRequest.getAssetDetails()[0].resourceId;
    const params = { // Bucket info


      Bucket: 'asset-repair' ,
      Delimiter: '/',
        Prefix: resourceId + '/inspection/',
    }

    this.fileService.getS3Bucket().listObjects(params, (err, data) => {
      if(err){
        console.log(err);
      }else {
        console.log(data);
        console.log('type:  '+typeof data);
        this.data = data;

      }

    })
   }
}
