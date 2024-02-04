import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bobinage } from './Bobinage-service.model'

@Injectable({
  providedIn: 'root'
})
export class BobinageServiceService {

  url: string = environment.apiBaseUrl + '/Bobinages';


constructor(private http: HttpClient) { }


AddBobinage(BobinageAjouter: Bobinage): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, BobinageAjouter);
}

getBobinageByTransformateurId(transformateurId: number): Observable<Bobinage[]> {
  const apiUrl = `${this.url}/ByTransformateur/${transformateurId}`;
  return this.http.get<Bobinage[]>(apiUrl);
}


UpdateListBobinage(bobinages: Bobinage[]): Observable<any> {
  const apiUrl = `${this.url}/UpdateList`;
  // Send a PUT request to the UpdateList endpoint with the list of Bobinage entities
  return this.http.put(apiUrl, bobinages);
}

}
