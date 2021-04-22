import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fall-back',
  templateUrl: './fall-back.component.html',
  styleUrls: ['./fall-back.component.scss']
})

/*
* FallBackComponent Component to handle mistyped URL's with an informative Error message
*/
export class FallBackComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
