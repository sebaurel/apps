import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commentaire } from '../models/commentaire.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  //commentaire: Commentaire = new Commentaire();

  constructor(
    private http: HttpClient
  ) { }

  public getCommentaires(idRecette: number): Observable<any>{
    return this.http.get(environment.API_URL+'rest/commentaire/recette/'+idRecette, {observe: "body"});
  };

  public postCommentaire(commentaire: Commentaire){
    return this.http.post<Commentaire>(environment.API_URL+'rest/commentaire', commentaire, {observe: 'response'});
  };
  
  public putCommentaire(commentaire: Commentaire) {
    return this.http.put<Commentaire>(environment.API_URL+'rest/commentaire', commentaire, {observe: 'body'});
  }

  public deleteCommentaire(idCommentaire: number) {
    return this.http.delete<Commentaire>(environment.API_URL+'rest/commentaire/'+idCommentaire, {observe: "body"});
  }

  public getLastCommentaire(): Observable<any> {
    return this.http.get(environment.API_URL+'rest/commentaire/last', {observe: 'body'});
  }
  


}
