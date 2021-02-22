import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Test1Service {
public ser:string;
setSer(ser:string){
  this.ser = ser;
}
getSer(){
  return this.ser;
}
  constructor() {

  }
}
