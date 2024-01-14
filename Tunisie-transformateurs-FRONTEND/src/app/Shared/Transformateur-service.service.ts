import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Transformateur } from './Transformateur-service.model';

@Injectable({
  providedIn: 'root'
})
export class TransformateurServiceService {

url:string = environment.apiBaseUrl+'/Transformateurs'
list:Transformateur[] = [];
constructor(private http : HttpClient) { }
refreshList()
{
this.http.get(this.url)
.subscribe({
  next :res => {
    this.list = res as Transformateur[]
  },
  error: err => { console.log(err)}
})
}


DeleteTransformateur(id:number)
{
  return this.http.delete(this.url+'/'+id)
}

}
