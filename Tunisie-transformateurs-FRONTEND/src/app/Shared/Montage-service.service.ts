import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Montage } from './Montage-service.model';

@Injectable({
  providedIn: 'root'
})
export class MontageServiceService {

  url: string = environment.apiBaseUrl + '/Montages';

constructor(private http : HttpClient) { }

AddMontage(MontageAjouter: Montage): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, MontageAjouter);
}

getMontageByTransformateurId(transformateurId: number): Observable<Montage[]> {
  const apiUrl = `${this.url}/ByTransformateur/${transformateurId}`;
  return this.http.get<Montage[]>(apiUrl);
}

UpdateListMontage(Montages: Montage[]): Observable<any> {
  const apiUrl = `${this.url}/UpdateList`;
  // Send a PUT request to the UpdateList endpoint with the list of Bobinage entities
  return this.http.put(apiUrl, Montages);
}


}
