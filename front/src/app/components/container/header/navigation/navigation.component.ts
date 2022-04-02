import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Utilisateur } from 'src/app/modules/authentication/models/utilisateur.model';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faUser = faUser;
  
  home: string = "dropdown";
  ongletRecettes: string = "dropdown";
  menuRecettes: boolean = false;
  ongletBlog: string = "dropdown";
  menuBlog: boolean = false;
  contact: string = "dropdown";
  ongletCompte: string = "dropdown";
  menuCompte: boolean = false;
  admin: boolean = false;
  url: string;
  urls: UrlSegment[];
  currentUser: Utilisateur = new Utilisateur();


  @Input()
  loggedIn:boolean;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
  ) { 

  }

  ngOnInit() {
    
    if (JSON.parse(localStorage.getItem('currentUser'))) this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


    if (this.loggedIn && this.currentUser.role == "ADMIN") this.admin = true;

    this.urls = this.route.snapshot.url;
    this.url = this.urls[0].path;

    switch (this.url) {
      case "home" :
        this.home="dropdown active";
        break
      case "recette" :
      case "recettes" :
        this.ongletRecettes="dropdown active";
        break
      case "login" :
      case "compte" :
      case "mesrecettes" :
      case "mesfavoris" :
        this.ongletCompte="dropdown active";
        break
      };
  };

  activate(menu: string){
    switch (menu) {
      case "home" :
        this.home="dropdown active";
        break

      case "recettes" :
        this.ongletRecettes="dropdown active";
        this.menuRecettes = true;
        break
      
      case "blog" :
        this.ongletBlog="dropdown active";
        this.menuBlog = true;
        break

      case "contact" :
        this.contact="dropdown active";
        break

      case "login" :
      case "compte" :
        this.ongletCompte="dropdown active";
        this.menuCompte = true;
        break
    }
  }

  deActivate(menu: string){
    switch (menu) {
      case "home" :
        if (this.url != 'home') this.home="dropdown";
        break

      case "recettes" :
        if (this.url != 'recettes') this.ongletRecettes="dropdown";
        this.menuRecettes = false;
        break
      
      case "blog" :
        if (this.url != 'blog') this.ongletBlog="dropdown";
        this.menuBlog = false;
        break

      case "contact" :
        if (this.url != 'contact') this.contact="dropdown";
        break

      case "compte" :
        if (this.url != 'compte' && this.url != 'login') this.ongletCompte="dropdown";
        this.menuCompte = false;
        break
    }
  }

  logOut() {
    this.authService.logOut();
  }

}
