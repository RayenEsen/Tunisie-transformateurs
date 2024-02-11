import { Component, OnInit } from '@angular/core';
import { Montage } from '../Shared/Montage-service.model';
import { MontageServiceService } from '../Shared/Montage-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { SessionService } from '../utils/session-service.service';
import { EventServiceService } from '../Shared/Event-service.service'
import { Event } from '../Shared/Event-service.model'
@Component({
  selector: 'app-Montage-component',
  templateUrl: './Montage-component.component.html',
  styleUrls: ['./Montage-component.component.css']
})
export class MontageComponentComponent implements OnInit {

  transformateurId: number = 0;
  Montages: Montage[] = [];
  etapeSelected : Etape = new Etape;
  etapenumero:number = 0;


  constructor(public ServiceMontage : MontageServiceService,public router: Router,private route: ActivatedRoute , public service : TransformateurServiceService, public SessionS : SessionService , public ServiceE : EtapeServiceService , public eventService : EventServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero= +params['etapenumero'] || 0;

      if (this.transformateurId) {
        this.ServiceMontage.getMontageByTransformateurId(this.transformateurId)
          .subscribe((result: Montage[]) => {
            this.Montages = result;
            console.log(this.Montages);
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
    });
  }
  Update() {
    this.ServiceMontage.UpdateListMontage(this.Montages).subscribe(
        () => {
            console.log('Montages updated successfully');
                                    // Creating and adding the event
                                    const newEvent = new Event(this.SessionS.Controleur.idC, 'Participer a le Controle Montage', new Date(),"opéré par " + this.etapeSelected.controleurs[0] + " et " + this.etapeSelected.controleurs[1] + " pour le transformateur " + this.transformateurId + ".");
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
            if (this.SessionS.Controleur) {
                // Determine the index position to insert the Controleur object based on its designation
                let controleurIndex = this.SessionS.Controleur.designation === "Controleur" ? 2 : 3;
                // Insert the Controleur object into the controleurs array at the determined index position
                this.etapeSelected.controleurs.splice(controleurIndex, 0, this.SessionS.Controleur);
                // Update etapeSelected with the modified controleurs array
                this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe(
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
            console.error('Error updating Montages:', error);
            // Check the error details for more information
            if (error && error.error && error.error.errors) {
                console.log('Validation errors:', error.error.errors);
            }
            // Handle the error as needed
        }
    );
}


    // Function to handle the print action
    onPrint() {
      window.print();

    }

}
