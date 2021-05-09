import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})@Injectable()
export class VehiclesService {
  AcceptOrDenied  = false;

  public serNo: string;
  /**@param serNo serialNumber
   */
  serSerialNo(serNo: string) {
    this.serNo = serNo;

  }
  /**
   * @return serNo returns the serial number
   */
  public getSerNo() {
    return this.serNo;
  }
// inject the constractor with HttpClient
  constructor(private httpClient: HttpClient) {

  }

  /**@param serialNo serial number to search the correct vehicle
   * @return Observable
   * request the api and returns the fetched value which is of type observable
   */
  getVehicleData(serialNo: string): Observable<HttpResponse<any>> {
    this.serSerialNo(serialNo);
    const url =   'https://test-assetlookup.dev.assetfront.com/asset/lookup/' + serialNo;
    return this.httpClient.get(url, {observe: 'response'});

  }
  loadingFunction(){
    console.log('loading....');
  }
}
