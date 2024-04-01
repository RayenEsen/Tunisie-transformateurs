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
import { MessageService } from 'primeng/api';
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


  constructor(public ServiceB : BobinageServiceService,public router: Router,private route: ActivatedRoute , public service : TransformateurServiceService , public ServiceE : EtapeServiceService , public ServiceS : SessionService , public eventService : EventServiceService , public ServiceMessage : MessageService,
    ) { }

  ngOnInit() {
    console.log(this.ServiceS.Controleur)
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
        this.ServiceMessage.add({ severity: 'success', summary: 'Succès', detail: 'Bobinage mis à jour avec succès' });
        if (this.bobinages.every(bobinage => bobinage.cnc === "C"))
        {
          this.etapeSelected.resultat="Conforme"
          this.etapeSelected2.resultat="Conforme"
          this.etapeSelected3.resultat="Conforme"
        }
        if (this.bobinages.some(bobinage => bobinage.cnc === "NC"))
        {
          this.etapeSelected.resultat="Non conforme"
          this.etapeSelected2.resultat="Non conforme"
          this.etapeSelected3.resultat="Non conforme"
        }


        if(this.ServiceS.Controleur.designation==="Controleur" && this.ServiceS.Controleur.username)
        {
          this.etapeSelected.controleur=this.ServiceS.Controleur.username;
        }


        if(this.ServiceS.Controleur.designation==="Verificateur" && this.ServiceS.Controleur.username)
        {
          this.etapeSelected.verificateur=this.ServiceS.Controleur.username;
        }

        if(this.ServiceS.Controleur.designation==="Controleur")
        {
          const newEvent = new Event(this.ServiceS.Controleur.idC, 'Participer a le Controle dimensionnelle bobinage BT'
          , new Date(),this.ServiceS.Controleur.username+" a Participer a le Controle dimensionnelle bobinage BT de le transformateur " + this.transformateurId);
          this.eventService.AddEvent(newEvent)
          .subscribe({
            next: (response) => {
              console.log('Event added successfully:', response);
            // Update the etapeSelected
            this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe({
              next: (response) => {

              },
            });

            this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero+1, this.etapeSelected2).subscribe({
              next: (response) => {

              },
            });

            this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero+2, this.etapeSelected3).subscribe({
              next: (response) => {

              },
            });
            },
            error: (error) => {
              console.error('Error adding event:', error);
            }
          });
        }
        else
        {
          const newEvent = new Event(this.ServiceS.Controleur.idC, 'Verifier le Controle dimensionnelle bobinage BT'
          , new Date(),this.ServiceS.Controleur.username+" a Verifier le Controle dimensionnelle bobinage BT de le transformateur " + this.transformateurId);
          this.eventService.AddEvent(newEvent)
          .subscribe({
            next: (response) => {
              console.log('Event added successfully:', response);
            // Update the etapeSelected
            this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe({
              next: (response) => {

              },
            });

            this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero+1, this.etapeSelected2).subscribe({
              next: (response) => {

              },
            });

            this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero+2, this.etapeSelected3).subscribe({
              next: (response) => {

              },
            });

            },
            error: (error) => {
              console.error('Error adding event:', error);
            }
          });
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
