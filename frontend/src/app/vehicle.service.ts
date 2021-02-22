import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IVehicle} from './IVehicle';

@Injectable({
  providedIn: 'root'
})@Injectable()
export class VehiclesService  {

  constructor(private httpClient: HttpClient){

  }


  getVehicleData(serialNo: string): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        api_key : 'JFg26WuKBjgZ',
        'content-type' : 'application/json',
        'X-Requested-With': 'HttpClient'
      })
      // We are connecting to the Api through self made springboot application(API)
     // Assetfront Api:  'https://test-assetlookup.dev.assetfront.com/asset/lookup/'
    };
    const url = 'https://test-assetlookup.dev.assetfront.com/asset/lookup/'  + serialNo;

    return this.httpClient.get<IVehicle[]>(url, httpOptions);
  }

}
