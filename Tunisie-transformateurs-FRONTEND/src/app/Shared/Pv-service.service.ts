import { Injectable } from '@angular/core';
import { Pv } from './Pv-service.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PvServiceService {

  private url: string = environment.apiBaseUrl + '/Pvs';

  constructor(private http: HttpClient) { }

  AddPv(PvAjouter: Pv): Observable<any> {
    // Return the observable from the HTTP POST request
    return this.http.post(this.url, PvAjouter);
  }

  // Updated method to get a single Pv by transformerId
  getPvByTransformerId(transformerId: number): Observable<Pv[]> {
    const apiUrl = `${this.url}/ByTransformateur/${transformerId}`;
    return this.http.get<Pv[]>(apiUrl);
  }
  UpdatePv(id : number , UpdatePv : Pv): Observable<any>
  {
    return this.http.put<Pv>(`${this.url}/${id}`,UpdatePv);
  }
  getPvsCountByResult(result: string): Observable<number> {
    const apiUrl = `${this.url}/CountByResult/${result}`;
    return this.http.get<number>(apiUrl);
  }

}
