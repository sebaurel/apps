import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { Photo } from 'src/app/model/photo.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  
  profil: Utilisateur = new Utilisateur();
  photo: Photo = new Photo();
  pathUpload: string = environment.PATH_UPLOAD;

  constructor(
    private route: ActivatedRoute,
    private utilisateurService: UtilisateurService
  ) {
    this.route.params.subscribe(params => {
      this.utilisateurService.findUser(params['id']).subscribe((profil: Utilisateur) => {
        this.profil = profil;
        if (profil.photo == null){
          this.photo = new Photo();
        } else {
          this.photo = profil.photo;
        }
      });
    });
  }

  ngOnInit(): void {
    
  }

}
