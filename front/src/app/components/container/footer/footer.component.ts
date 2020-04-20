import { Component, OnInit, Input } from '@angular/core';
import { RecetteService } from 'src/app/services/recette.service';
import { Observable } from 'rxjs';
import { Recette } from 'src/app/model/recette.model';
import { environment } from 'src/environments/environment';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Commentaire } from 'src/app/model/commentaire.model';
import { Photo } from 'src/app/model/photo.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() loggedIn: boolean;
  pathUpload: string = environment.PATH_UPLOAD;
  lastRecette$: Observable<Recette>;
  lastCommentaire$ : Observable<Commentaire>;
  lastPhoto$ : Observable<Photo>;

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
