  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { environment } from '../../environments/environment.development';
  import { Observable } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import { Event} from './Event-service.model'
  @Injectable({
    providedIn: 'root'
  })
  export class EventServiceService {

    private url: string = environment.apiBaseUrl + '/Events';


  constructor(private http: HttpClient) { }


  AddEvent(event: Event): Observable<any> {
    return this.http.post(this.url, event);
  }

  // Method to get events by controller ID
  GetEventsByController(controllerId: string): Observable<Event[]> {
    const controllerUrl = `${this.url}/ByController/${controllerId}`;
    return this.http.get<Event[]>(controllerUrl);
  }

  }
