import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/modules/authentication/models/utilisateur.model';

import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {

  currentUser: Utilisateur;

  loggedIn: boolean;

  activateMenu: boolean;

  constructor(
    private utilisateurService: UtilisateurService,
    ) { 
    this.currentUser = this.utilisateurService.getCurrentUserLogged();
    if (localStorage.getItem('Token')) this.loggedIn = true;
    else this.loggedIn = false;
  }

  ngOnInit() {
  }

  closeNavigationMobile() {
    this.activateMenu = false;
  }
 

}
