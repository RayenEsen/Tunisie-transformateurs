import { Component, OnInit } from '@angular/core';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { Router } from '@angular/router';
import { Event } from '../Shared/Event-service.model'
import { EventServiceService } from '../Shared/Event-service.service'
import { SessionService } from '../utils/session-service.service'
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-CreateAcount-component',
  templateUrl: './CreateAcount-component.component.html',
  styleUrls: ['./CreateAcount-component.component.css']
})
export class CreateAcountComponentComponent implements OnInit {

  Controleur :ControleurDeQualite =
  {
    idC: '',
    email: '',
    password: ''
  };

  constructor(public ServiceM : MessageService,public ServiceC : ControlleurServiceService , private router: Router , public ServiceS : SessionService , public eventService : EventServiceService) { }

  ngOnInit() {
  }

  ValidateInputs() {
    return (this.Controleur.idC !== '') && this.Controleur.email !== '' && this.Controleur.password !== '';
  }

  Login() {
    if (this.ValidateInputs()) {
      this.ServiceC.getControleur(this.Controleur.idC, this.Controleur.password, this.Controleur.email).subscribe({
        next: (userExists) => {
          if (userExists) {
            // User exists, start the session and navigate to Edit_profile
            this.ServiceS.sessionStart(this.Controleur);
                      // Creating and adding the event
          const newEvent = new Event(this.ServiceS.Controleur.idC, 'Connecter', new Date(),"");
          this.eventService.AddEvent(newEvent)
            .subscribe({
              next: (response) => {
                console.log('Event added successfully:', response);
                // Add any further logic here if needed
              },
              error: (error) => {
                console.error('Error adding event:', error);
                // Handle the error appropriately
              }
            });
            this.router.navigate(['/Edit_profile']);
          } else {
            // User not found
            this.ServiceM.add({
              severity: 'error',
              summary: 'Utilisateur introuvable',
              detail: 'Identifiant ou mot de passe incorrect. Veuillez réessayer.'
            });
            }
        },
        error: (error) => {
          if (error.status === 404) {
            this.ServiceM.add({
              severity: 'error',
              summary: 'Utilisateur introuvable',
              detail: 'Identifiant ou mot de passe incorrect. Veuillez réessayer.'
            });
            } else {
            // Handle other types of errors if needed
            console.error('An error occurred:', error);
          }
        }
      });
    } else {
      this.ServiceM.add({ severity: 'warn', summary: 'Attention', detail: 'Toutes les entrées sont obligatoires.' });
    }
  }
  eyeClosed: boolean = true;

  toggleEye() {
    this.eyeClosed = !this.eyeClosed;
  }
}
