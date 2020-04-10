import { Component, OnInit, Input } from '@angular/core';
import { Commentaire } from 'src/app/model/commentaire.model';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {

  @Input() idRecette: number ;
  @Input() idUtilisateur: number ;
  @Input() commentaires: Commentaire[];

  pathUpload: String = environment.PATH_UPLOAD;

  constructor() { }

  ngOnInit() { 

  }

}
