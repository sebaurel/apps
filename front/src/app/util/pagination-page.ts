import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Page<T> {
    count: number;      // total number of items
    next: string;       // URL of the next page
    previous: string;   // URL of the previous page
    content: Array<T>;  // items for the current page
  }

  
export function queryPaginated<T>(http: HttpClient, baseUrl: string, emailUtilisateur?: string, categories?: number[], alimentsId?: number[], favori?: string, seulementLesAliments?:boolean, urlOrFilter?: string | object): Observable<Page<T>> {
  let params = new HttpParams();
  let url = baseUrl;

  if (typeof urlOrFilter === 'string') {
    // we were given a page URL, use it
    url = urlOrFilter;
  } else if (typeof urlOrFilter === 'object') {
    // we were given filtering criteria, build the query string
    Object.keys(urlOrFilter).sort().forEach(key => {
      const value = urlOrFilter[key];
      if (value !== null) {
        params = params.set(key, value.toString());
      }
    });
  }
  params = params.set('email',emailUtilisateur);
  params = params.set('categories',JSON.stringify(categories));
  params = params.set('aliments',JSON.stringify(alimentsId));
  params = params.set('favori',favori);
  params = params.set('seulementLesAliments',JSON.stringify(seulementLesAliments));

  return http.get<Page<T>>(url, {
    params: params
  });
}