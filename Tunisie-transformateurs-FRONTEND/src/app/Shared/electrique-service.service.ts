import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Electrique } from './electrique-service.model';
@Injectable({
  providedIn: 'root'
})
export class ElectriqueServiceService {

  url: string = environment.apiBaseUrl + '/Electriques';


constructor(private http: HttpClient) { }

AddBobinage(ElectriqueAjouter: Electrique): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, ElectriqueAjouter);
}

getElectriqueByTransformateurId(transformateurId: number): Observable<Electrique[]> {
  const apiUrl = `${this.url}/ByTransformateur/${transformateurId}`;
  return this.http.get<Electrique[]>(apiUrl);
}

UpdateListElectrique(electriques: Electrique[]): Observable<any> {
  const apiUrl = `${this.url}/UpdateList`;
  // Send a PUT request to the UpdateList endpoint with the list of Bobinage entities
  return this.http.put(apiUrl, electriques);
}



}
