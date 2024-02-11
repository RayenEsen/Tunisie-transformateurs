import { Component, OnInit } from '@angular/core';
import { Magnetique } from '../Shared/Magnetique-service.model';
import { MagnetiqueServiceService } from '../Shared/Magnetique-service.service'
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Event } from '../Shared/Event-service.model'
import { EventServiceService } from '../Shared/Event-service.service'
import { SessionService } from '../utils/session-service.service'
import { Etape } from '../Shared/Etape-servicemodel';
import { EtapeServiceService } from '../Shared/Etape-service.service';

@Component({
  selector: 'app-Magnetique-component',
  templateUrl: './Magnetique-component.component.html',
  styleUrls: ['./Magnetique-component.component.css']
})
export class MagnetiqueComponentComponent implements OnInit {

  transformateurId: number = 0;
  Magnetiques: Magnetique[] = [];
  etapeSelected : Etape = new Etape;
  etapenumero:number = 0;

  constructor(public ServiceM : MagnetiqueServiceService,
              public router: Router,
              private route: ActivatedRoute ,
              public service : TransformateurServiceService,
              public serviceS : SessionService,
              public serviceE : EtapeServiceService,
              public eventService : EventServiceService,
              ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero= +params['etapenumero'] || 0;
      if (this.transformateurId) {
        this.ServiceM.getMagnetiqueByTransformateurId(this.transformateurId)
          .subscribe((result: Magnetique[]) => {
            this.Magnetiques = result;
            console.log(this.Magnetiques);
          });
          this.service.GetTransformateur(this.transformateurId);
      }
      this.serviceE.getEtapeByNumeroAndTransformateur(this.etapenumero,this.transformateurId)
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
    });
  }
  Update() {
    // Call the service method to update Magnetiques
    this.ServiceM.UpdateListBobinage(this.Magnetiques).subscribe(
        () => {
            console.log('Magnetiques updated successfully');
            // Creating and adding the event
            const newEvent = new Event(this.serviceS.Controleur.idC, 'Participer a le Controle dimensionnelle circuit magnetique', new Date()," opéré par " + this.etapeSelected.controleurs[0] + " et " + this.etapeSelected.controleurs[1] + " pour le transformateur " + this.transformateurId + ".");
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
            // Check if the session's Controleur is present
            if (this.serviceS.Controleur) {
                // Determine the index position to insert the Controleur object based on its designation
                let controleurIndex = this.serviceS.Controleur.designation === "Controleur" ? 2 : 3;
                // Insert the Controleur object into the controleurs array at the determined index position
                this.etapeSelected.controleurs.splice(controleurIndex, 0, this.serviceS.Controleur);
                // Update etapeSelected with the modified controleurs array
                this.serviceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe(
                    () => {
                        console.log('Etape updated successfully:', this.etapeSelected);
                    },
                    error => {
                        console.error('Error updating Etape:', error);
                    }
                );
            }
        },
        error => {
            console.error('Error updating Magnetiques:', error);
        }
    );
}

    // Function to handle the print action
    onPrint() {
      window.print();

    }
}
