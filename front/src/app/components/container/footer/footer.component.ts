import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commentaire } from 'src/app/modules/shared-components/models/commentaire.model';
import { Recette } from 'src/app/modules/recette/models/recette.model';
import { RecetteService } from 'src/app/modules/recette/services/recette.service';
import { Photo } from 'src/app/modules/shared-components/models/photo.model';
import { CommentaireService } from 'src/app/modules/shared-components/services/commentaire.service';
import { PhotoService } from 'src/app/modules/shared-components/services/photo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() loggedIn: boolean;
  pathUpload: string = environment.PATH_UPLOAD;
  lastRecette$: Observable<Recette[]>;
  lastCommentaire$ : Observable<Commentaire[]>;
  lastPhoto$ : Observable<Photo[]>;

  constructor(
    private recetteService: RecetteService,
    private commentaireService: CommentaireService,
    private photoService: PhotoService
  ) {
    this.lastRecette$ = this.recetteService.getLastRecette();
    this.lastCommentaire$ = this.commentaireService.getLastCommentaire();
    this.lastPhoto$ = this.photoService.getLastPhoto();
  }

  ngOnInit() {
  }

}
