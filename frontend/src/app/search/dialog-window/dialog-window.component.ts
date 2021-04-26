import {Component, OnInit} from '@angular/core';
import {ApiRequestService} from '../../API-request/api-request.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {VehiclesService} from '../../../vehicle-service/vehicle.service';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss']
})
export class DialogWindowComponent implements OnInit {
  workingPlaceholder = '../../assets/images/default-image.jpg';

  constructor(
    public service: VehiclesService,
    public request: ApiRequestService,
    public router: Router,
    private dialogRef: MatDialogRef<DialogWindowComponent>
  ){ }

  ngOnInit(): void {
  }

  onLoaded(isFallback: boolean) {
    console.log(isFallback);
  }

  acceptVehicle(){
    this.service.AcceptOrDenied = true;
    this.router.navigate(['/home']);
    this.dialogRef.close();
  }

  deniedVehicle(){
    this.router.navigate(['/search']);
    this.dialogRef.close();
    this.service.AcceptOrDenied = false;
  }
}
