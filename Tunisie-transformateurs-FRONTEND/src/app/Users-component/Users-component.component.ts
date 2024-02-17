import { Component, OnInit } from '@angular/core';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model'
import { ControleComponentComponent } from '../Controle-component/Controle-component.component'
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { Event } from '../Shared/Event-service.model'
import { EventServiceService } from '../Shared/Event-service.service'
import { SessionService } from '../utils/session-service.service'

@Component({
  selector: 'app-Users-component',
  templateUrl: './Users-component.component.html',
  styleUrls: ['./Users-component.component.css']
})
export class UsersComponentComponent implements OnInit {

  list : ControleurDeQualite[] = [];
  events : Event[] = [];
  UserSelected: ControleurDeQualite | null = null;
  keyword: string = "";
  constructor(public ServiceC : ControlleurServiceService,public eventService : EventServiceService,public ServiceS : SessionService) { }

  ngOnInit(): void {
    this.ServiceC.getAllControleurs().subscribe({
      next: (data) => {
        this.list=data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getControllerById(id : string) {
    // Check if UserSelected is already set
    if (this.UserSelected?.idC === id) {
      this.UserSelected = null; // Clear user selection
      this.events = [];
    } else {
      // Fetch the user data
      this.ServiceC.getControleurById(id).subscribe({
        next: (data) => {
          this.UserSelected = data;
          // Fetch events for the selected user
          this.eventService.GetEventsByController(this.UserSelected!.idC).subscribe({
            next : (events: Event[]) => {
              this.events = events;
            }
          });
        }
      });
    }
  }


  Update(id: string, User: ControleurDeQualite) {
    console.log(this.ServiceS.Controleur)
    this.ServiceC.UpdateControleurById(id, User)
      .subscribe({
        next: (response) => {
          // Find the controlleur in the list array that matches the id
          let controlleur = this.list.find(c => c.idC === id);
          if (controlleur) {
            // Update the properties of the existing controlleur object
            Object.assign(controlleur, response);
            console.log('Controleur updated successfully:', response);
            alert('Les informations de la Controleur ont été enregistrées');
          } else {
            console.error('Controleur not found for id:', id);
          }
          console.log(this.ServiceS.Controleur)
        },
        error: (error) => {
          // Handle the error
          console.error('Error updating Controleur:', error);
        }
      });
  }

  getElapsedTime(eventDate: Date | string): string {
    const eventDateTime = typeof eventDate === 'string' ? new Date(eventDate) : (eventDate as Date);
    const now = new Date().toString();

    const diffMs = Date.parse(now) - eventDateTime.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffDays > 0) {
        return `il y a ${diffDays} jour(s)`;
    } else if (diffHrs > 0) {
        return `il y a ${diffHrs} heure(s)`;
    } else if (diffMins > 0) {
        return `il y a ${diffMins} minute(s)`;
    } else {
        return "il y a moins d'une minute";
    }
}


Supprimer(id: string) {
  this.ServiceC.RemoveControleur(id).subscribe({
    next: (response) => {
      // Remove the deleted controleur from the list
      this.list = this.list.filter(c => c.idC !== id);
      console.log(`${this.UserSelected?.username} has been deleted successfully`);
      // Clear session if the deleted user is the current user
      if (this.UserSelected && this.UserSelected.idC === id) {
        this.ServiceS.sessionDestroy();
        console.log('Session cleared successfully');
      } // Closing parenthesis added here
    },
    error: (error) => {
      console.error('Error deleting Controleur:', error);
    }
  });
}


  search(keyword : string)
  {
    this.ServiceC.SearchControlleurs(keyword).subscribe({
      next: (response) =>
      {
        this.list=response;
      }
    })
  }


}
