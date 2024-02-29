import { Injectable } from '@angular/core';
import { OperateurSuggestions } from './OperateurSuggestions-service.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OperateurSuggestionsServiceService {

  url: string = environment.apiBaseUrl + '/OperateurSuggestions';

constructor(private http : HttpClient) { }

AddSuggestion(operateurSuggestions: OperateurSuggestions): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, operateurSuggestions);
}


GetAllSuggestions(): Observable<any> {
  return this.http.get<any>(this.url);
}

}
