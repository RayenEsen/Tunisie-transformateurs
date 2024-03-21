import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Rapport } from './Rapport-service.model';
@Injectable({
  providedIn: 'root'
})
export class RapportServiceService {

  url: string = environment.apiBaseUrl + '/Rapports';


constructor(private http : HttpClient) { }

AddRapport(RapportAjouter: Rapport): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, RapportAjouter);
}

  // Check if Rapport exists by EtapeId
  checkRapportExistsByEtapeId(etapeId: number): Observable<boolean> {
    const endpoint = `${this.url}/ExistsByEtapeId/${etapeId}`;
    return this.http.get<boolean>(endpoint).pipe(
      catchError(error => {
        console.error('Error checking if Rapport exists:', error);
        return throwError(error);
      })
    );
  }

}
