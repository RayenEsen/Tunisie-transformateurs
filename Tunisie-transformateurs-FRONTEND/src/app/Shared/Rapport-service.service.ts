// Import necessary modules
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

  constructor(private http: HttpClient) { }

  // Method to add or update a Rapport
  upsertRapport(rapport: Rapport): Observable<any> {
    // If Rapport ID is present, it means we are updating an existing Rapport
    if (rapport.idRapport) {
      return this.updateRapport(rapport);
    } else {
      return this.addRapport(rapport);
    }
  }

  // Method to add a Rapport
  private addRapport(rapport: Rapport): Observable<any> {
    return this.http.post(this.url, rapport).pipe(
      catchError(error => {
        console.error('Error adding Rapport:', error);
        return throwError(error);
      })
    );
  }

  // Method to update a Rapport
  private updateRapport(rapport: Rapport): Observable<any> {
    const updateUrl = `${this.url}/${rapport.idRapport}`;
    return this.http.put(updateUrl, rapport).pipe(
      catchError(error => {
        console.error('Error updating Rapport:', error);
        return throwError(error);
      })
    );
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

  // Method to get Rapport by EtapeId
  getRapportByEtapeId(etapeId: number): Observable<Rapport> {
    const endpoint = `${this.url}/ByEtapeId/${etapeId}`;
    return this.http.get<Rapport>(endpoint).pipe(
      catchError(error => {
        console.error('Error getting Rapport by EtapeId:', error);
        return throwError(error);
      })
    );
  }
}
