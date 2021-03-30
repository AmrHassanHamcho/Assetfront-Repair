import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TcrService {
  private tcr: any;

  constructor() { }
  setTcr(tcr){
    this.tcr = tcr;
  }
  getTcr(){
    return this.tcr;
  }
}
