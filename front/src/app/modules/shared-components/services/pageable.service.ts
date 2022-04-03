import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageableService {

  constructor() { }

  rechargement(pageUrl: Subject<string>, pageNavigate: number, pageSize: number): void {
    pageUrl.next(environment.API_URL + 'rest/recette/list/?page=' + pageNavigate.toString() + "&size=" + pageSize.toString());
  }
}
