import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Conseption } from './Conseption-service.model';
@Injectable({
  providedIn: 'root'
})
export class ConseptionServiceService {

  url: string = environment.apiBaseUrl + '/Conseptions';


constructor(public http : HttpClient) { }

addConseptionToTransformateur(transformateurId: number, conseption: Conseption): Observable<Conseption> {
  const url = `${this.url}/${transformateurId}`;
  return this.http.post<Conseption>(url, conseption);
}


}
