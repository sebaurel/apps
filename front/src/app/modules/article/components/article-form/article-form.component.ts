import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Photo } from 'src/app/models/photo.model';
import { Utilisateur } from 'src/app/modules/authentication/models/utilisateur.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  utilisateur: Utilisateur = this.userService.getCurrentUserLogged();
  article: Article = new Article();
  
  photoThumbPath: String;
  progress: { percentage: number } = { percentage: 0 };

  formBuilder: FormBuilder = new FormBuilder();

  formArticle: FormGroup = this.formBuilder.group({
    titre:['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    body: ['', Validators.required],
  });

  validationMessage = {
    'titre' : {
      'required': 'Le titre est obligatoire',
      'minlength': 'le titre doit comporter plus de 2 caractères',
      'maxlength': 'le titre doit comporter moins de 60 caractères'
    },
    'body':{
      'required': 'L\'article est obligatoire'
    }
  };

  formErrors = {
    'titre': '',
    'body': '',
  };

  confirmExit: boolean = false;

  constructor(private userService : UtilisateurService,
              private articleServices : ArticleService) { }

  ngOnInit(): void {
    //console.log(JSON.stringify(this.utilisateur));
}

  bodyChange(body: string){
    this.article.body = body;
    this.confirmExit = true;
  }
  
  photoChange(photo: Photo){
    this.article.photo = photo;
    this.confirmExit = true;
  }

  onValide(){
    this.article.title = this.formArticle.get('titre').value;
    this.article.redacteur = this.utilisateur;
    this.articleServices.saveArticle(this.article).subscribe(article => {
      //this.router.navigate(['/article/'+this.article.id]);
    });
  }

  confirmExitPage(){
    if (this.confirmExit) {
      return confirm("Attention, vous quittez cette page sans avoir enregistré votre article !!");
    }else {
      return true;
    }
  }
}
