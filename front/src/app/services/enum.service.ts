import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../modules/recette/models/categorie.model';
import { environment } from "../../environments/environment";
import { Unite } from '../modules/recette/models/unite.model';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor(
    private http: HttpClient
  ) { }

  public getCategories(): Observable<Categorie>{
    return  this.http.get<Categorie>(environment.API_URL+'rest/categorie', {observe: "body"});
  }

  public getUnites(): Observable<Unite>{
    return  this.http.get<Unite>(environment.API_URL+'rest/unite', {observe: "body"});
  }

}
