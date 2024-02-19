import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Peinture } from './Peinture-service.model';
@Injectable({
  providedIn: 'root'
})
export class PeintureServiceService {

  url: string = environment.apiBaseUrl + '/Peintures';

constructor(private http: HttpClient) { }

addPeinture(peinture: Peinture): Observable<any> {
  return this.http.post(this.url, peinture);
}

getPeintureByTransformateurId(transformateurId: number): Observable<Peinture[]> {
  const apiUrl = `${this.url}/ByTransformateur/${transformateurId}`;
  return this.http.get<Peinture[]>(apiUrl);
}

updateListPeinture(peintures: Peinture[]): Observable<any> {
  const apiUrl = `${this.url}/UpdateList`;
  return this.http.put(apiUrl, peintures);
}

}
