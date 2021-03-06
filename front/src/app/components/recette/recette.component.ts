import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faHeart, faUser, faComment, faCalendar, faPrint } from '@fortawesome/free-solid-svg-icons';

import { RecetteService } from '../../services/recette.service';
import { Recette } from '../../model/recette.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';

import { environment } from "../../../environments/environment";
import { EnumService } from 'src/app/services/enum.service';
import { Observable } from 'rxjs';
import { Unite } from 'src/app/model/unite.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Commentaire } from 'src/app/model/commentaire.model';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss']
})
export class RecetteComponent implements OnInit {

  faUser = faUser;
  faPrint = faPrint;
  faComment = faComment;
  faCalendar = faCalendar;
  faEdit = faEdit;
  faHeart = faHeart;
  
  recette: Recette = new Recette();
  pathUpload: String = environment.PATH_UPLOAD;
  photoPath: string;
  photoPathThumb: string;
  isLoading: boolean = false;
  unites$: Observable<Unite>;
  currentUser: Utilisateur = JSON.parse(localStorage.getItem('currentUser'));
  loggedIn: boolean = false;
  admin: boolean = false;
  currentUserEmail: string = null;
  commentaires: Commentaire[] = new Array;

  constructor(
    private route: ActivatedRoute,
    private enumService: EnumService,
    private utilisateurService: UtilisateurService,
    private recetteService: RecetteService,
    public printService: PrintService
  ) { 
    this.isLoading = true;
    if (this.currentUser != null){
      this.loggedIn = true;
      this.currentUserEmail = this.currentUser.email;
      if (this.currentUser.role == "ADMIN") this.admin = true;
    } 

    this.route.params.subscribe(params => {
      this.recetteService.getRecette(params['id'])
      .subscribe((rec : Recette) => {
        this.recette = rec;
        this.recette.commentaires.forEach((commentaire: Commentaire) =>{
          if(commentaire.valide) this.commentaires.push(commentaire);
        });
        if (this.currentUser) {
          this.currentUser.favoris.forEach(favori => {
            if (favori.id == this.recette.id) this.recette.favori = "actif";
          });
        };
        this.isLoading = false;
      })
    });
  }

  ngOnInit() {
    this.photoPath = environment.PATH_UPLOAD + "default.png";
    this.photoPathThumb = environment.PATH_UPLOAD + "default-thumb.png";
    this.recette.utilisateur = new Utilisateur;
    this.unites$ = this.enumService.getUnites();
  }

  addDeleteFavori(recette: Recette){
    if (recette.favori == "actif"){
      recette.favori = "";
      this.utilisateurService.deleteFavori(this.currentUser.email, JSON.stringify(recette.id))
      .subscribe(data => {
        localStorage.setItem("currentUser", JSON.stringify(data));
      });
    }else{
      recette.favori = "actif";
      this.utilisateurService.addFavori(this.currentUser.email, JSON.stringify(recette.id))
      .subscribe(data => {
        localStorage.setItem("currentUser", JSON.stringify(data));
      });
    }
  }
  
  onPrint(){
    this.printService
      .printRecette(this.recette.id);
  }

}
