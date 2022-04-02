import { Component, OnInit, Input } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { CommentaireService } from 'src/app/services/commentaire.service';
import { Commentaire } from 'src/app/models/commentaire.model';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {

  @Input() admin: boolean;
  @Input() loggedIn: boolean;
  @Input() idRecette: number;
  @Input() idUtilisateur: number;
  @Input() commentaires: Commentaire[];

  pathUpload: String = environment.PATH_UPLOAD;

  constructor(    
    private commentaireService: CommentaireService,
    ) { }

  ngOnInit() { 
  }

  spliceCommentaire(commentaire: Commentaire){
    if(confirm("vous allez supprimer un commentaire")){
      this.commentaireService.deleteCommentaire(commentaire.id).subscribe(() => {
          let index = this.commentaires.indexOf(commentaire);
          this.commentaires.splice(index, 1); 
      });
    }
  }
}
