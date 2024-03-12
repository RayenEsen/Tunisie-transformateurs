import { Component, OnInit } from '@angular/core';
import { Event } from '../Shared/Event-service.model'
import { EventServiceService } from '../Shared/Event-service.service'
import { SessionService } from '../utils/session-service.service'
import {ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public ServiceC : ControlleurServiceService,public ServiceM : MessageService,public router: Router,public ServiceS : SessionService,public eventService : EventServiceService,private confirmationService: ConfirmationService,) { }

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
  visible : boolean = false;
  showDialog()
  {
  if(this.ServiceS.Controleur.designation==="Administrateur")
  {
    this.router.navigate(['/Utilisateurs']);
  }
  else
  {
    this.visible=!this.visible;
  }
  }
  Controleur : ControleurDeQualite = this.ServiceS.Controleur;
  Key : string = '';
  VerifyKey() {
    if (this.Key === 'TT') {
      this.Controleur.designation = "Administrateur";
      this.ServiceC.UpdateControleurById(this.Controleur.idC, this.Controleur).subscribe({
        next: (Response) => {
          this.visible = false;
          this.Key = '';
          this.router.navigate(['/Utilisateurs']);
        },
        error: (error) => {
          console.error('Error updating controller:', error);
          this.ServiceM.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la mise à jour du contrôleur.' });
        }
      });
    } else {
      this.ServiceM.add({ severity: 'error', summary: 'Erreur', detail: 'Clé incorrecte.' });
    }
}
}
