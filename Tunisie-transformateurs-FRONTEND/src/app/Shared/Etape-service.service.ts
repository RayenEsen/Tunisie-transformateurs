import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etape } from './Etape-servicemodel';

@Injectable({
  providedIn: 'root'
})
export class EtapeServiceService {

  private url: string = environment.apiBaseUrl + '/Etapes';

  constructor(private http: HttpClient) { }

  AddEtape(etape: Etape): Observable<any> {
    return this.http.post(this.url, etape);
  }

  // New method to get Etapes by Transformateur id
  getEtapesByTransformateurId(transformateurId: number): Observable<Etape[]> {
    const apiUrl = `${this.url}/ByTransformateur/${transformateurId}`;
    return this.http.get<Etape[]>(apiUrl);
  }
}
