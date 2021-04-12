import { Component, OnInit } from '@angular/core';
import {TcrService} from '../tcr.service';
import {MatDialog} from '@angular/material/dialog';
import {PersonalDataComponent} from '../personal-data/personal-data.component';

@Component({
  selector: 'app-tcr-dialog',
  templateUrl: './tcr-dialog.component.html',
  styleUrls: ['./tcr-dialog.component.scss']
})
export class TcrDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
}
