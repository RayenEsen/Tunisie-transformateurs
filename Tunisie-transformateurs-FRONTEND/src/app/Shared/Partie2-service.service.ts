import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Partie2 } from './Partie2-service.model';

@Injectable({
  providedIn: 'root'
})
export class Partie2ServiceService {

  url: string = environment.apiBaseUrl + '/Etape1';


constructor(private http: HttpClient) { }

AddPartie2(partie2: Partie2): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, partie2);
}

getPartie2ByTransformateurId(transformateurId: number): Observable<Partie2[]> {
  const apiUrl = `${this.url}/ByTransformateur/${transformateurId}`;
  return this.http.get<Partie2[]>(apiUrl);
}

UpdateListPartie2(partie2: Partie2[]): Observable<any> {
  const apiUrl = `${this.url}/UpdateList`;
  // Send a PUT request to the UpdateList endpoint with the list of Bobinage entities
  return this.http.put(apiUrl, partie2);
}

}
