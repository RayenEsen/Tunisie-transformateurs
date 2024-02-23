import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Conseption } from './Conseption-service.model';
import { ConseptionValues } from './ConseptionValues-service.model';
@Injectable({
  providedIn: 'root'
})
export class ConseptionValuesServiceService {

  url: string = environment.apiBaseUrl + '/ConseptionValues';

constructor(public http : HttpClient) { }

addConseptionValues(ConseptionValuesAjouter: ConseptionValues): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, ConseptionValuesAjouter);
}

}
