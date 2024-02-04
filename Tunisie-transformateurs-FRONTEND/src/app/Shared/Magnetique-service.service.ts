import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Magnetique } from './Magnetique-service.model';

@Injectable({
  providedIn: 'root'
})
export class MagnetiqueServiceService {

  url: string = environment.apiBaseUrl + '/Magnetiques';

constructor(private http : HttpClient) { }

AddBobinage(MagnetiqueAjouter: Magnetique): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, MagnetiqueAjouter);
}

getMagnetiqueByTransformateurId(transformateurId: number): Observable<Magnetique[]> {
  const apiUrl = `${this.url}/ByTransformateur/${transformateurId}`;
  return this.http.get<Magnetique[]>(apiUrl);
}

UpdateListBobinage(Magnetiques: Magnetique[]): Observable<any> {
  const apiUrl = `${this.url}/UpdateList`;
  // Send a PUT request to the UpdateList endpoint with the list of Bobinage entities
  return this.http.put(apiUrl, Magnetiques);
}



}
