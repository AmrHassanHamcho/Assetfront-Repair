import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {

  navbarOpen = false;
  componentHidden = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }
  hideComponent(): boolean{
    return this.componentHidden;
}
setHideComponent(componentHidden: boolean){
    this.componentHidden = componentHidden;
}
}
