import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-desktop',
  templateUrl: './nav-desktop.component.html',
  styleUrls: ['./nav-desktop.component.scss']
})
export class NavDesktopComponent implements OnInit {

  @Input()
  loggedIn:boolean;

  constructor() { }

  ngOnInit() {
  }

}
