import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Commentaire } from 'src/app/model/commentaire.model';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { Utilisateur } from 'src/app/model/utilisateur.model';

@Component({
  selector: 'app-modal-commentaire',
  templateUrl: './modal-commentaire.component.html',
  styleUrls: ['./modal-commentaire.component.scss']
})
export class ModalCommentaireComponent implements OnInit {
  commentaire: Commentaire = new Commentaire();
  @Input() idRecette: number ;
  @Input() idUtilisateur: number ;
  @Input() commentaires: Commentaire[];
  currentUser: Utilisateur = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private modalService: NgbModal,
    private commentaireService: CommentaireService
  ) { }

  ngOnInit() { }

  open(content) {
    this.modalService.open(content)
  }
  
  addCommentaire(){
    this.commentaire.redacteur = this.currentUser;
    this.commentaire.idRecette = this.idRecette;
    this.commentaire.idUtilisateur = this.idUtilisateur;
    this.commentaire.valide = true;
    this.commentaireService.postCommentaire(this.commentaire).subscribe(commentaire => {this.commentaires.push(commentaire.body)});
  }
}
