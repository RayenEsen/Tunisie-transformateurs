import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Liquide } from './liquide-service.model';
@Injectable({
  providedIn: 'root'
})
export class LiquideServiceService {

  url: string = environment.apiBaseUrl + '/Liquides';


  constructor(private http: HttpClient) { }

  // Method to fetch liquides by transformateur numero
  getLiquidesByTransformateur(numero: number): Observable<Liquide[]> {
    const apiUrl = `${this.url}/ByTransformateur/${numero}`;
    return this.http.get<Liquide[]>(apiUrl)
  }

    // Method to update liquides
    updateLiquides(liquides: Liquide[]): Observable<any> {
      const apiUrl = `${this.url}/PutLiquides`;
      return this.http.put<any>(apiUrl, liquides)
    }
  

}
