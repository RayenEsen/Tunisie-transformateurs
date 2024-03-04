import { Component, OnInit } from '@angular/core';
import { Event } from '../Shared/Event-service.model'
import { EventServiceService } from '../Shared/Event-service.service'
import { SessionService } from '../utils/session-service.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public ServiceS : SessionService,public eventService : EventServiceService) { }

  ngOnInit() {
  }

  Disconnect()
  {
    // Creating and adding the event
    const username = this.ServiceS.Controleur && this.ServiceS.Controleur.username ? this.ServiceS.Controleur.username : '';
    const newEvent = new Event(this.ServiceS.Controleur.idC, 'Deconnecter',  new Date(),username+ " a Deconnecter");

    this.eventService.AddEvent(newEvent).subscribe({
    next: (response) => {
    },
    error: (error) => {
    console.error('Error adding event:', error);
    }
    });
    this.ServiceS.sessionDestroy();
  }
}
