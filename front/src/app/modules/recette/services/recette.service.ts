import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page, queryPaginated } from 'src/app/modules/shared-components/util/page';
import { Recette } from '../models/recette.model';


@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  
  position: number = 0;
  recette: Recette;
  constructor(
    private http: HttpClient, 
  ) { }

  public postRecette<Recette>(recette : Recette){
    return this.http.post<Recette>(environment.API_URL+'rest/recette', recette, { observe: 'body'});
  }

  public putRecette(recette : Recette){
    this.ordonneCollection(recette.etapes);
    this.ordonneCollection(recette.ingredients);
    return this.http.put<Recette>(environment.API_URL+'rest/recette', recette, { observe: 'response'});
  }

  public getRecettes(): Observable<any>{
    return this.http.get(environment.API_URL+'rest/recette', {observe: 'body'});
  }

  public getRecette(idRecette :number): Observable<any>{
    return this.http.get(environment.API_URL+'rest/recette/'+ idRecette, {observe: 'body'});
  }

  public getLastRecette(): Observable<any>{
    return this.http.get(environment.API_URL+'rest/recette/last', {observe: 'body'});
  }
  
  public getRandomRecette(nombre: number): Observable<any> {
    return this.http.get(environment.API_URL+'rest/recette/random/'+nombre, {observe: 'body'});
  }

  public deleteRecette(idRecette :number): Observable<any>{
    return this.http.delete(environment.API_URL+'rest/recette/'+ idRecette);
  }

  list(emailUtilisateur?: string, categories?: number[], alimentsId?: number[], favori?: boolean, seulementLesAliments?:boolean, urlOrFilter?: string | object): Observable<Page<Recette>> {
    return queryPaginated<Recette>(this.http, environment.API_URL+'rest/recette/list', emailUtilisateur, categories, alimentsId, favori, seulementLesAliments, urlOrFilter);
  }
  
  ordonneCollection(collection){
    collection.forEach(element => {
      element.ordre = this.position;
      this.position++;
    });
    this.position = 0;
  }
}

