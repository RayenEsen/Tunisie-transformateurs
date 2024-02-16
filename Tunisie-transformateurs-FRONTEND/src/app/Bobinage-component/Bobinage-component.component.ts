import { Component, OnInit } from '@angular/core';
import { BobinageServiceService } from '../Shared/Bobinage-service.service'
import { Bobinage } from '../Shared/Bobinage-service.model'
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { SessionService } from '../utils/session-service.service';
import { EventServiceService } from '../Shared/Event-service.service'
import { Event } from '../Shared/Event-service.model'

@Component({
  selector: 'app-Bobinage-component',
  templateUrl: './Bobinage-component.component.html',
  styleUrls: ['./Bobinage-component.component.css']
})
export class BobinageComponentComponent implements OnInit {

  etapenumero:number = 0;
  transformateurId: number = 0;
  bobinages: Bobinage[] = [];
  etapeSelected : Etape = new Etape;
  etapeSelected2 : Etape = new Etape;
  etapeSelected3 : Etape = new Etape;


  constructor(public ServiceB : BobinageServiceService,public router: Router,private route: ActivatedRoute , public service : TransformateurServiceService , public ServiceE : EtapeServiceService , public ServiceS : SessionService , public eventService : EventServiceService,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero= +params['etapenumero'] || 0;
      if (this.transformateurId) {
        this.ServiceB.getBobinageByTransformateurId(this.transformateurId)
          .subscribe((result: Bobinage[]) => {
            this.bobinages = result;
            console.log(this.bobinages);
          });
          this.service.GetTransformateur(this.transformateurId);
      }
      this.ServiceE.getEtapeByNumeroAndTransformateur(this.etapenumero,this.transformateurId)
      .subscribe(
        etape => {
          this.etapeSelected=etape;
          console.log(this.etapeSelected);
        },
        error => {
          // Handle any errors that occur during the HTTP request
          console.error('Error fetching etape:', error);
        }
      );
      this.ServiceE.getEtapeByNumeroAndTransformateur(this.etapenumero+1,this.transformateurId)
      .subscribe(
        etape => {
          this.etapeSelected2=etape;
          console.log(this.etapeSelected);
        },
        error => {
          // Handle any errors that occur during the HTTP request
          console.error('Error fetching etape:', error);
        }
      );
    });
    this.ServiceE.getEtapeByNumeroAndTransformateur(this.etapenumero+2,this.transformateurId)
    .subscribe(
      etape => {
        this.etapeSelected3=etape;
        console.log(this.etapeSelected);
      },
      error => {
        // Handle any errors that occur during the HTTP request
        console.error('Error fetching etape:', error);
      }
    );
  }

  Update() {
    // Call the service method to update bobinages
    this.ServiceB.UpdateListBobinage(this.bobinages).subscribe(
      () => {
        console.log('Bobinages updated successfully');

        // Creating and adding the event
        const newEvent = new Event(this.ServiceS.Controleur.idC, 'Participer a le Controle dimensionnelle bobinage BT'
          , new Date(), " pour le transformateur " + this.transformateurId + ".");
        this.eventService.AddEvent(newEvent)
          .subscribe({
            next: (response) => {
              console.log('Event added successfully:', response);
// Check if there is already a controller with designation 'Controlleur'
const existingControllerIndex = this.etapeSelected.controleurs.findIndex(controller => controller.designation === 'Controlleur');

// If there is an existing controller with designation 'Controlleur', replace it
if (existingControllerIndex !== -1) {
  this.etapeSelected.controleurs[existingControllerIndex] = this.ServiceS.Controleur;
} else {
  // If there is no existing controller with designation 'Controlleur', add the new controller to the end
  this.etapeSelected.controleurs.push(this.ServiceS.Controleur);
}

// Update the etapeSelected
this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe({
  next: (response) => {
    console.log('Etape updated successfully:', response);
    // Handle the response as needed
  },
});
            },
            error: (error) => {
              console.error('Error adding event:', error);
            }
          });
      },
      error => {
        console.error('Error updating bobinages:', error);
      }
    );
  }

  hasControleur(): boolean {
    if (!this.etapeSelected || !this.etapeSelected.controleurs) {
      return false; // If etapeSelected or controleurs is not defined or null, return false
    }

    // Loop through controleurs array to find if any controller has the designation "Controleur"
    for (let index = 0; index < this.etapeSelected.controleurs.length; index++) {
      if (this.etapeSelected.controleurs[index]?.designation === 'Controleur') {
        return true; // If found, return true
      }
    }

    return false; // If not found, return false
  }


  hasVerificateur(): boolean {
    if (!this.etapeSelected || !this.etapeSelected.controleurs) {
      return false; // If etapeSelected or controleurs is not defined or null, return false
    }

    // Loop through controleurs array to find if any controller has the designation "Verificateur"
    for (let index = 0; index < this.etapeSelected.controleurs.length; index++) {
      if (this.etapeSelected.controleurs[index]?.designation === 'Verificateur') {
        return true; // If found, return true
      }
    }

    return false; // If not found, return false
  }

    // Function to handle the print action
    onPrint() {
      window.print();
    }
}
