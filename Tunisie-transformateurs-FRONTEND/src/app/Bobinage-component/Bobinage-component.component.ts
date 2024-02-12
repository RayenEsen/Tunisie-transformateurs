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
                        , new Date(),"opéré par " + this.etapeSelected.controleurs[0] + " et " + this.etapeSelected.controleurs[1] +
                        " pour le transformateur " + this.transformateurId + ".");
                        this.eventService.AddEvent(newEvent)
                        .subscribe({
                        next: (response) => {
                        console.log('Event added successfully:', response);
                        },
                        error: (error) => {
                        console.error('Error adding event:', error);
                        }
                        });
            // Check if the session's Controleur is present
            if (this.ServiceS.Controleur) {
                // Determine the index position to insert the Controleur object based on its designation
                let controleurIndex = this.ServiceS.Controleur.designation === "Controleur" ? 2 : 3;
                // Insert the Controleur object into the controleurs array at the determined index position
                this.etapeSelected.controleurs.splice(controleurIndex, 0, this.ServiceS.Controleur);
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
            console.error('Error updating bobinages:', error);
        }
    );
}


    // Function to handle the print action
    onPrint() {
      window.print();
    }
}
