import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/util/form.util';
import { Commentaire } from 'src/app/modules/shared-components/models/commentaire.model';
import { Utilisateur } from 'src/app/modules/authentication/models/utilisateur.model';
import { Photo } from '../../models/photo.model';
import { CommentaireService } from '../../services/commentaire.service';

@Component({
  selector: 'app-modal-commentaire',
  templateUrl: './modal-commentaire.component.html',
  styleUrls: ['./modal-commentaire.component.scss']
})
export class ModalCommentaireComponent implements OnInit {
  faEraser = faEraser;
  @Input() commentaire: Commentaire;
  photos: Photo[] = [];
  photo:Photo;
  @Input() idRecette: number ;
  @Input() idUtilisateur: number ;
  @Input() commentaires: Commentaire[];
  currentUser: Utilisateur = JSON.parse(localStorage.getItem('currentUser'));

  photoThumbPath: String = environment.PATH_UPLOAD;
  progress: { percentage: number } = { percentage: 0 };

  @Input() editCommentaire: boolean;

  formCommentaire: FormGroup = this.formBuilder.group({
    title:['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    body: ['', Validators.required]
  });

  validationMessage = {
    'title' : {
      'required': 'Le titre du commentaire est obligatoire',
      'minlength': 'Le titre doit comporter plus de 2 caractères',
      'maxlength': 'Le titre doit comporter moins de 60 caractères'
    },
    'body':{
      'required': 'Un commentaire est obligatoire !'
    }
  };

  formErrors = {
    'title': '',
    'body': ''
  };


  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private commentaireService: CommentaireService
  ) { }

  ngOnInit() { 
    if (this.editCommentaire) {
      this.photos = this.commentaire.photos
      this.formCommentaire.setValue({
        title: this.commentaire.title,
        body: this.commentaire.body
      });
    } else {
      this.commentaire = new Commentaire();
    }
  }

  open(content) {
    this.modalService.open(content)
  }
  
  addCommentaire(formCommentaire){

    FormValidator(this.formCommentaire, this.formErrors, this.validationMessage);

    if (this.formCommentaire.valid) {
      this.commentaire.photos = this.photos;

      if (!this.editCommentaire) this.commentaire.redacteur = this.currentUser;
      this.commentaire.idRecette = this.idRecette;
      this.commentaire.idUtilisateur = this.idUtilisateur;
      this.commentaire.valide = true;
      this.commentaire.title = formCommentaire.get('title').value;
      this.commentaire.body = formCommentaire.get('body').value;

      if (this.editCommentaire){
        this.commentaireService.putCommentaire(this.commentaire).subscribe((commentaire: Commentaire ) => {
          let commentairePlace: number = this.commentaires.indexOf(this.commentaire); 
          this.commentaires.splice(commentairePlace, 1, commentaire);
        });
      }else {
        this.commentaireService.postCommentaire(this.commentaire).subscribe(commentaire => {this.commentaires.push(commentaire.body)});
      }
      this.modalService.dismissAll();
    }
  }

  photoCommentaireUpload(photo: Photo){
    this.photos.push(photo);
  }

  cancelPhoto(photo: Photo){
    let photoToErase: number = this.photos.indexOf(photo);
    this.photos.splice(photoToErase, 1);
  }

}
