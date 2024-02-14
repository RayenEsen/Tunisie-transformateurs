import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BobinageMTServiceService } from '../Shared/BobinageMT-service.service';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { BobinageMT } from '../Shared/BobinageMT-service.model';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { SessionService } from '../utils/session-service.service';
import { EventServiceService } from '../Shared/Event-service.service'
import { Event } from '../Shared/Event-service.model'
@Component({
  selector: 'app-BobinageMT-component',
  templateUrl: './BobinageMT-component.component.html',
  styleUrls: ['./BobinageMT-component.component.css']
})
export class BobinageMTComponentComponent implements OnInit {

  transformateurId: number = 0;
  bobinagesMT: BobinageMT[] = [];
  etapeSelected : Etape = new Etape;
  etapenumero:number = 0;
  etapeSelected2 : Etape = new Etape;
  etapeSelected3 : Etape = new Etape;

  constructor(
    public ServiceMT: BobinageMTServiceService,
    public router: Router,
    private route: ActivatedRoute,
    public service: TransformateurServiceService,
    public ServiceE: EtapeServiceService,
    public ServiceS: SessionService,
    public eventService : EventServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero= +params['etapenumero'] || 0;

      if (this.transformateurId) {
        this.ServiceMT.getBobinageByTransformateurId(this.transformateurId)
          .subscribe((result: BobinageMT[]) => {
            this.bobinagesMT = result;
            console.log(this.bobinagesMT);
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
      ),
      this.ServiceE.getEtapeByNumeroAndTransformateur(this.etapenumero+1,this.transformateurId)
      .subscribe(
        etape => {
          this.etapeSelected2=etape;
          console.log(this.etapeSelected2);
        },
        error => {
          // Handle any errors that occur during the HTTP request
          console.error('Error fetching etape:', error);
        }
      ),
      this.ServiceE.getEtapeByNumeroAndTransformateur(this.etapenumero+2,this.transformateurId)
      .subscribe(
        etape => {
          this.etapeSelected3=etape;
          console.log(this.etapeSelected3);
        },
        error => {
          // Handle any errors that occur during the HTTP request
          console.error('Error fetching etape:', error);
        }
      )

    });

  }
  Update() {
    // Call the service method to update bobinages
    this.ServiceMT.UpdateListBobinage(this.bobinagesMT).subscribe(
        () => {
            console.log('Bobinages updated successfully');
                        // Creating and adding the event
                        const newEvent = new Event(this.ServiceS.Controleur.idC,'Participer a le Controle dimensionnelle bobinage MT', new Date(),"opéré par " + this.etapeSelected.controleurs[0] + " et " + this.etapeSelected.controleurs[1] + " pour le transformateur " + this.transformateurId + ".");
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
