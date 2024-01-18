import { Injectable } from '@angular/core';
import { Pv } from './Pv-service.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PvServiceService {

  url: string = environment.apiBaseUrl + '/Pvs';

constructor(private http: HttpClient) { }

AddPv(PvAjouter: Pv): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, PvAjouter);
}
}
