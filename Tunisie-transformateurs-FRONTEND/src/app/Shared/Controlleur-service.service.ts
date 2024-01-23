import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ControleurDeQualite } from './Controlleur-service.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ControlleurServiceService {

url: string = environment.apiBaseUrl + '/ControleurDeQualité';


constructor(private http: HttpClient) { }


AddControleur(Controleur: ControleurDeQualite): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, ControleurDeQualite);
}

getControleur(id: string): Observable<any> {
  const urlWithId = `${this.url}/${id}`;

  return this.http.get(urlWithId);
}
}
