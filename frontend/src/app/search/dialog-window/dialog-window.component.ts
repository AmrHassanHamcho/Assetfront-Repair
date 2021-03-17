import {Component, Injectable, OnInit} from '@angular/core';
import {ApiRequestService} from '../../API-request/api-request.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {HeaderComponent} from '../../header/header.component';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss']
})
export class DialogWindowComponent implements OnInit {
  x = false;

  constructor(
    public header: HeaderComponent,
    public request: ApiRequestService,
    public router: Router,
    private dialogRef: MatDialogRef<DialogWindowComponent>
  ){ }

  ngOnInit(): void {
  }

  acceptVehicle(){
    this.header.acceptRequest();
    this.router.navigate(['/home']);
    this.dialogRef.close();
  }

  deniedVehicle(){
    this.router.navigate(['/search']);
    this.dialogRef.close();
    return this.header.AcceptOrDenied = false;
  }
}
