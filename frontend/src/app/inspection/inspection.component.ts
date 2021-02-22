import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {
  inspectionStatus = '';
  constructor() { }

  ngOnInit(): void {
  }

  onUpdateInspectionStatus(event: Event)
  {
    this.inspectionStatus=(<HTMLInputElement>event.target).value;
  }

}
