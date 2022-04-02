import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-article-mobile',
  templateUrl: './sidebar-article-mobile.component.html',
  styleUrls: ['./sidebar-article-mobile.component.scss']
})
export class SidebarArticleMobileComponent {
  activateSidebar: boolean;
  
  constructor() { }
  
  openSidebarMobile() {
    this.activateSidebar = true;
  }
  closeSidebarMobile() {
    this.activateSidebar = false;
  }
  
}
