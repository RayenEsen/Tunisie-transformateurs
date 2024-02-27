import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Cons, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Conseption } from './Conseption-service.model';
@Injectable({
  providedIn: 'root'
})
export class ConseptionServiceService {

  url: string = environment.apiBaseUrl + '/Conseptions';


constructor(public http : HttpClient) { }

addConseption(ConseptionAjouter: Conseption): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, ConseptionAjouter);
}

  // Method to fetch Conseptions by Transformateur ID
  getConseptionsByTransformateur(transformateurId: number): Observable<Conseption[]> {
    const url = `${this.url}/Transformateur/${transformateurId}`;
    return this.http.get<Conseption[]>(url)

  }

  updateConseptions(transformateurId: number, updatedConseptions: any[]): Observable<any> {
    const url = `${this.url}/UpdateConseption/Transformateur/${transformateurId}`;
    const updatedData = updatedConseptions.map(conseption => {
      if (conseption.image instanceof ArrayBuffer) {
        // Convert ArrayBuffer to Base64 string
        conseption.image = this.arrayBufferToBase64(conseption.image);
      }
      return conseption;
    });

    return this.http.put(url, updatedData)
      .pipe(
        catchError(error => {
          console.error('Error updating Conseptions:', error);
          throw error; // Rethrow the error for further handling
        })
      );
  }

  // Function to convert ArrayBuffer to Base64
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binary = new Uint8Array(buffer);
    let binaryString = '';
    for (let i = 0; i < binary.length; i++) {
      binaryString += String.fromCharCode(binary[i]);
    }
    return btoa(binaryString);
  }


}
