import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-mobile',
  templateUrl: './sidebar-mobile.component.html',
  styleUrls: ['./sidebar-mobile.component.scss']
})
export class SidebarMobileComponent {

 
  activateSidebar: boolean;

  constructor() { }

  openSidebarMobile() {
    this.activateSidebar = true;
  }
  closeSidebarMobile() {
    this.activateSidebar = false;
  }
  
}
