import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../model/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http : HttpClient) { }

    public saveArticle(article: Article){
      return this.http.put(environment.API_URL+'rest/article', article);
    }

    public getArticle(idArticle: number): Observable<any>{
      return this.http.get(environment.API_URL+'rest/article/'+idArticle, {observe: "body"});
    };
}
