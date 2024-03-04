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
    // Convert the date to UTC
    const utcDate = new Date(Date.UTC(
      event.eventDate.getFullYear(),
      event.eventDate.getMonth(),
      event.eventDate.getDate(),
      event.eventDate.getHours(),
      event.eventDate.getMinutes(),
      event.eventDate.getSeconds(),
      event.eventDate.getMilliseconds()
    ));

    // Create a new Event object with the UTC date
    const eventWithUTCDate: Event = {
      ...event,
      eventDate: utcDate
    };

    // Send the modified event object to the server
    return this.http.post(this.url, eventWithUTCDate);
  }
  // Method to get events by controller ID
  GetEventsByController(controllerId: string): Observable<Event[]> {
    const controllerUrl = `${this.url}/ByController/${controllerId}`;
    return this.http.get<Event[]>(controllerUrl);
  }


  GetAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url);
  }

  }
