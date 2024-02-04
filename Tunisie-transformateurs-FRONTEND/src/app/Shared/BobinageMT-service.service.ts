import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BobinageMT } from './BobinageMT-service.model';

@Injectable({
  providedIn: 'root'
})
export class BobinageMTServiceService {

  url: string = environment.apiBaseUrl + '/BobinageMTs';


constructor(private http : HttpClient) { }

getBobinageByTransformateurId(transformateurId: number): Observable<BobinageMT[]> {
  const apiUrl = `${this.url}/ByTransformateur/${transformateurId}`;
  return this.http.get<BobinageMT[]>(apiUrl);
}

AddBobinage(BobinageMTAjouter: BobinageMT): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, BobinageMTAjouter);
}

UpdateListBobinage(bobinagesMT: BobinageMT[]): Observable<any> {
  const apiUrl = `${this.url}/UpdateList`;
  // Send a PUT request to the UpdateList endpoint with the list of Bobinage entities
  return this.http.put(apiUrl, bobinagesMT);
}

}
