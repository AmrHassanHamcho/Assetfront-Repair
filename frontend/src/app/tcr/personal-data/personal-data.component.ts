import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  private abdi: string;

  constructor() { }

  ngOnInit(): void {
  }

  setName(abdi: string) {
    this.abdi = abdi;
  }
}
