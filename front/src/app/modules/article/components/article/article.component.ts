import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faHeart, faUser, faComment, faCalendar, faPrint } from '@fortawesome/free-solid-svg-icons';
import { PrintService } from 'src/app/services/print.service';
import { environment } from 'src/environments/environment';

import Quill from 'quill';

// or, from each individual module
//import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import { BlotFormatter } from 'quill-blot-formatter';
import { Utilisateur } from 'src/app/modules/authentication/models/utilisateur.model';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
Quill.debug('error');
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  quillModules = {
    toolbar: false,
    blotFormatter: false
  };


  faUser = faUser;
  faPrint = faPrint;
  faComment = faComment;
  faCalendar = faCalendar;
  faEdit = faEdit;
  faHeart = faHeart;
 
  article: Article = new Article();
  isLoading: boolean = false;
  pathUpload: String = environment.PATH_UPLOAD;
  photoPath: string;
  photoPathThumb: string;

  constructor(private route: ActivatedRoute,
              //private utilisateurService: UtilisateurService,
              private articleService: ArticleService,
              public printService: PrintService) {

    this.article.redacteur = new Utilisateur();
    this.isLoading = true;

    this.route.params.subscribe(params => {
      this.articleService.getArticle(params['id'])
      .subscribe((article : Article) => {
                                          this.article = article;
                                          this.isLoading = false;
                                        }
                )
    });
 
   
  }
  ngOnInit(): void {
    this.photoPath = environment.PATH_UPLOAD + "default.png";
    this.photoPathThumb = environment.PATH_UPLOAD + "default-thumb.png";

 }

  onPrint(){
    this.printService
      .printRecette(this.article.id);
  }
}
