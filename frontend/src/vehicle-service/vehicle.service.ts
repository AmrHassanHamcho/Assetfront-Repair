import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IVehicle} from '../app/search/IVehicle';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})@Injectable()
export class VehiclesService {
  public serNo: string;

  serSerialNo(serNo: string) {
    this.serNo = serNo;

  }

  public getSerNo() {
    return this.serNo;
  }

  constructor(private httpClient: HttpClient) {

  }


  getVehicleData(serialNo: string): Observable<any> {
    this.serSerialNo(serialNo);
    const url = 'http://localhost:8080/asset/lookup/' + serialNo;
    // const url =   'https://test-assetlookup.dev.assetfront.com/asset/lookup/' + serialNo;

    return this.httpClient.get<IVehicle[]>(url);


  }
}
