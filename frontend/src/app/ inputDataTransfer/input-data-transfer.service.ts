import { Injectable } from '@angular/core';
import {Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class InputDataTransferService {
  workshop;
  Email;
  fName;
  lName;
  date;
  hours;
  comment;
  company;
  phone;
  coast;
  filesControl;
  inspectionState;

  constructor() { }


}
