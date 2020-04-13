import { Component, Input } from '@angular/core';
import { faAngleDoubleLeft, faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.scss']
})

export class NavMobileComponent {
  faAngleDoubleLeft = faAngleDoubleLeft;
  faBars = faBars;
  @Input() activateMenu: boolean;
  @Input() loggedIn:boolean;

  constructor() { }

  openNavigationMobile() {
    this.activateMenu = true;
  }
  closeNavigationMobile() {
    this.activateMenu = false;
  }
}
