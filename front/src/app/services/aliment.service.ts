import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "../../environments/environment";
import { Aliment } from '../model/aliment.model';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  constructor(
    private http: HttpClient, 
  ) { };

  public postAliment(aliment: Aliment){
    return this.http.post<Aliment>(environment.API_URL+'rest/aliment', aliment, {observe: 'response'});
  };

  public putAliment(aliment: Aliment){
    return this.http.put<Aliment>(environment.API_URL+'rest/aliment', aliment, {observe: 'response'});
  };

  public getAliments(): Observable<Aliment[]>{
    return this.http.get<Aliment[]>(environment.API_URL+'rest/aliment', {observe: "body"});
  };

  public deleteAliment(idAliment: number): Observable<any> {
    return this.http.delete(environment.API_URL+'rest/aliment/'+idAliment, {observe: "body"});
  };

  public spliceAliment(aliment: Aliment, array: Array<Aliment>): void{
    let index = array.indexOf(aliment);
    array.splice(index, 1);
  };

  public pushAliment(aliment: Aliment, aliments: Aliment[]): void{
    aliments.push(aliment);
    if (aliments.length > 1) aliments.sort((a, b) => a.nom.localeCompare(b.nom));
  };

}
