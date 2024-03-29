import { Component, OnInit } from '@angular/core';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model'
import { ControleComponentComponent } from '../Controle-component/Controle-component.component'
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { Event } from '../Shared/Event-service.model'
import { EventServiceService } from '../Shared/Event-service.service'
import { SessionService } from '../utils/session-service.service'
import { Pfp } from '../Shared/pfp-service.model';
import { PfpServiceService } from '../Shared/pfp-service.service';
import { HttpResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-Users-component',
  templateUrl: './Users-component.component.html',
  styleUrls: ['./Users-component.component.css']
})
export class UsersComponentComponent implements OnInit {

  list : ControleurDeQualite[] = [];
  events : Event[] = [];
  eventsTotal : Event[] = [];

  UserSelected: ControleurDeQualite | null = null;
  PfoOfUserSelected?: string;
  keyword: string = "";
  imageData: string[] = [];
  defaultImageUrl = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
  sidebarVisible = false;
  constructor(public MessageService : MessageService,public ConformationService : ConfirmationService,public ServicePFP : PfpServiceService,public ServiceC : ControlleurServiceService,public eventService : EventServiceService,public ServiceS : SessionService) { }

  ngOnInit(): void {
    this.ServiceC.getAllControleurs().subscribe({
      next: (data) => {
        this.list = data;
        console.log(this.list);

        // Iterate over each Controleur in the list
        this.list.forEach((controleur) => {
          // Fetch the image data for the current Controleur
          this.ServicePFP.getPfp(controleur.idC).subscribe(
            (response: HttpResponse<Blob | null>) => {
              // Check if the response body is not null
              if (response.body !== null) {
                // Extract the URL from the response
                const url = window.URL.createObjectURL(response.body);
                // Push the URL to the imageData array
                this.imageData.push(url);
              } else {
                console.error('No image data returned for Controleur with id:', controleur.idC);
              }
            },
            (error) => {
              console.error('Error fetching pfp for Controleur with id:', controleur.idC, error);
            }
          );
        });
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
          if(this.UserSelected?.idC!==undefined)
          {
            this.ServicePFP.getPfp(this.UserSelected.idC).subscribe(
              (response: HttpResponse<Blob | null>) => {
              // Check if the response body is not null
              if (response.body !== null) {
                // Extract the URL from the response
                const url = window.URL.createObjectURL(response.body);
                // Assign the URL to the imageData property
                this.PfoOfUserSelected= url;
              } else {
                console.error('No image data returned.');
              }
            })
          }
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
            this.MessageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Le rôle de l\'utilisateur a été mis à jour avec succès'
            });
            } else {
            console.error('Controleur not found for id:', id);
          }
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

History()
{
  this.eventService.GetAllEvents().subscribe({
    next : (response) =>
    {
      this.eventsTotal = response;
    }
  })
}

isToday(eventDate: Date | string): boolean {
  // Convert eventDate to Date object if it's a string
  if (typeof eventDate === 'string') {
    eventDate = new Date(eventDate);
  }

  // Check if it's today
  const today = new Date();
  return eventDate.getFullYear() === today.getFullYear() &&
         eventDate.getMonth() === today.getMonth() &&
         eventDate.getDate() === today.getDate();
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
        this.UserSelected = null; // Clear the selected user
      } // Closing parenthesis added here
    },
    error: (error) => {
      console.error('Error deleting Controleur:', error);
    }
  });
}



search(keyword: string) {
  this.ServiceC.SearchControlleurs(keyword).subscribe({
    next: (response) => {
      this.list = response;

      // Clear imageData array before populating it with new data
      this.imageData = [];

      // Iterate over each Controleur in the list and fetch the image data
      this.list.forEach((controleur) => {
        this.ServicePFP.getPfp(controleur.idC).subscribe(
          (response: HttpResponse<Blob | null>) => {
            if (response.body !== null) {
              const url = window.URL.createObjectURL(response.body);
              this.imageData.push(url);
            } else {
              console.error('No image data returned for Controleur with id:', controleur.idC);
            }
          },
          (error) => {
            console.error('Error fetching pfp for Controleur with id:', controleur.idC, error);
          }
        );
      });
    },
    error: (error) => {
      console.error('Error searching Controleurs:', error);
    }
  });
}

confirm1(id: string) {
  // Use the confirmation service to display a confirmation dialog
  this.ConformationService.confirm({
    message: 'Confirmer la suppression du cette utilisateur?',
    header: 'Suppression',
    icon: 'pi pi-exclamation-triangle pi-lg',
    accept: () => {
          // Call the onDelete method to perform the deletion
          this.Supprimer(id);
          this.MessageService.add({ severity: 'info', summary: 'info', detail: 'Utilisateur supprimé avec succès' });
        },
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      reject: () => {
          // Logic to execute when the user cancels deletion
          console.log('Deletion cancelled');
          // You can put any action you want to perform upon cancellation here
      }
  });
}


}
