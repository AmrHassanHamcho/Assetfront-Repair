import { Component, OnInit } from '@angular/core';
import {Test1Service} from "../test1.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public ser: Test1Service) {
  }

  ngOnInit(): void {
  }


}
