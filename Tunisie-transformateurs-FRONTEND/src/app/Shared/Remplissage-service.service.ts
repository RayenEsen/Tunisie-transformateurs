import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Remplissage } from './Remplissage-service.model';

@Injectable({
  providedIn: 'root'
})
export class RemplissageServiceService {

  url: string = environment.apiBaseUrl + '/Remplissages';

  constructor(private http: HttpClient) { }

  addRemplissage(remplissageAjouter: Remplissage): Observable<any> {
    // Return the observable from the HTTP POST request
    return this.http.post(this.url, remplissageAjouter);
  }

  getRemplissagesByTransformateurId(transformateurId: number): Observable<Remplissage[]> {
    const apiUrl = `${this.url}/ByTransformateur/${transformateurId}`;
    return this.http.get<Remplissage[]>(apiUrl);
  }

  updateListRemplissage(remplissages: Remplissage[]): Observable<any> {
    const apiUrl = `${this.url}/UpdateList`;
    // Send a PUT request to the UpdateList endpoint with the list of Remplissage entities
    return this.http.put(apiUrl, remplissages);
  }

}
