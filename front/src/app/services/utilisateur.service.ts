import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Utilisateur } from '../model/utilisateur.model';
import { Observable } from 'rxjs';

@Injectable()
export class UtilisateurService {

  constructor(
    private http : HttpClient
  ) { }

  getCurrentUserLogged(): Utilisateur {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
 
  public saveUser(utilisateur: Utilisateur){
    return this.http.put(environment.API_URL+'rest/utilisateur', utilisateur);
  }

  public deleteUser(utilisateur: Utilisateur){
    let params = new HttpParams();
    params = params.set('email',utilisateur.email)
    return this.http.delete(environment.API_URL+'rest/utilisateur',{params: params});
  }

  public addFavori(emailUtilisateur:string, idRecette: string): Observable<any>{
    let params = new HttpParams();
    params = params.set('email',emailUtilisateur)
                   .set('idRecette',idRecette);
    return this.http.post(environment.API_URL+'rest/utilisateur/favori/add',{ "idRecette":idRecette, "email":emailUtilisateur } ,{params: params});
  }

  public deleteFavori(emailUtilisateur:string, idRecette: string): Observable<any>{
    let params = new HttpParams();
    params = params.set('email',emailUtilisateur)
                   .set('idRecette',idRecette);
    return this.http.delete(environment.API_URL+'rest/utilisateur/favori/delete',{params: params});
  }

  public enregistreFrigo(emailUtilisateur:string, alimentsId:number[]){
    let params = new HttpParams();
    params = params.set('email',emailUtilisateur)
                   .set('aliments',JSON.stringify(alimentsId));
    return this.http.post(environment.API_URL+'rest/utilisateur/frigo/sauv',{"email":emailUtilisateur, "aliments":alimentsId  }, {params: params});
  }
}
