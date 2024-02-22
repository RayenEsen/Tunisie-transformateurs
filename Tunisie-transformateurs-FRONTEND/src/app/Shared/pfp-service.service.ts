import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Pfp } from './pfp-service.model';


@Injectable({
  providedIn: 'root'
})


export class PfpServiceService {

  private url: string = environment.apiBaseUrl + '/pfps';

  constructor(private http: HttpClient) { }

  uploadPfp(controleurId: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const params = new HttpParams().set('controleurId', controleurId);

    return this.http.post<any>(this.url, formData, { params: params });
  }

  getPfp(controleurId: string): Observable<HttpResponse<Blob>> { // Change return type to Observable<HttpResponse<Blob>>
    const apiUrl = `${this.url}/image/${controleurId}`;
    return this.http.get<Blob>(apiUrl, { responseType: 'blob' as 'json', observe: 'response' }); // Set responseType to 'blob' and observe response
  }

  updatePfp(controleurId: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageFile', file);

    // Use the correct URL
    return this.http.put<any>(`${this.url}/image/${controleurId}`, formData);
  }




}
