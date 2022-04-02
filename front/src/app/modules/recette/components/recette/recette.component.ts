import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faHeart, faUser, faComment, faCalendar, faPrint } from '@fortawesome/free-solid-svg-icons';

import { Recette } from '../../models/recette.model';

import { environment } from "../../../../../environments/environment";
import { EnumService } from 'src/app/services/enum.service';
import { Observable } from 'rxjs';
import { PrintService } from 'src/app/services/print.service';
import { Unite } from '../../models/unite.model';
import { Utilisateur } from 'src/app/modules/authentication/models/utilisateur.model';
import { Commentaire } from 'src/app/models/commentaire.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { RecetteService } from '../../services/recette.service';

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
    private router: Router,
    public printService: PrintService,
  ) { 
    this.isLoading = true;
    if (this.currentUser != null){
      this.loggedIn = true;
      this.currentUserEmail = this.currentUser.email;
      if (this.currentUser.role == "ADMIN") this.admin = true;
    } 

    this.route.params.subscribe(params => {
      this.recetteService.getRecette(params['id'])
      .subscribe({next: (recette : Recette) => {
                                                this.recette = recette;
                                                this.recette.commentaires.forEach((commentaire: Commentaire) =>{
                                                  if(commentaire.valide) this.commentaires.push(commentaire);
                                                });
                                                if (this.currentUser) {
                                                  this.currentUser.favoris.forEach(favori => {
                                                    if (favori.id == this.recette.id) this.recette.favori = "actif";
                                                  });
                                                };
                                                this.isLoading = false;
                                              },
                  error: () => {
                                  alert('Recette non trouvée');
                                  this.router.navigate(['/recettes']);
                                }
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
