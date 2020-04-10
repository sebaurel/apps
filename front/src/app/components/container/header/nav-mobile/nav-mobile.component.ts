import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.scss']
})

export class NavMobileComponent implements OnInit {
  
  @Input()
  activateMenu: boolean;

  @Input()
  loggedIn:boolean;

  constructor() { }

  ngOnInit() { }

  openNavigationMobile() {
    this.activateMenu = true;
  }
  closeNavigationMobile() {
    this.activateMenu = false;
  }
}
