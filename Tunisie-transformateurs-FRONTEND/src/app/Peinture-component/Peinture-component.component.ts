import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { EventServiceService } from '../Shared/Event-service.service';
import { Event } from '../Shared/Event-service.model';
import { Peinture } from '../Shared/Peinture-service.model';
import { PeintureServiceService } from '../Shared/Peinture-service.service';
import { Message, MessageService } from 'primeng/api';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { SessionService } from '../utils/session-service.service';

@Component({
  selector: 'app-Peinture-component',
  templateUrl: './Peinture-component.component.html',
  styleUrls: ['./Peinture-component.component.css']
})
export class PeintureComponentComponent implements OnInit {


  transformateurId: number = 0;
  peintures : Peinture[] = [];
  selectedPeinture: Peinture | undefined;
  etapenumero:number = 0;
  etapeSelected : Etape = new Etape;

  constructor(public ServiceS : SessionService,public ServiceE : EtapeServiceService, public ServiceM : MessageService,public router: Router,public ServiceP : PeintureServiceService,private route: ActivatedRoute , public service : TransformateurServiceService, public eventService : EventServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero= +params['etapenumero'] || 0;

      this.service.GetTransformateur(this.transformateurId);
      this.ServiceE.getEtapeByNumeroAndTransformateur(this.etapenumero,this.transformateurId)
      .subscribe(
        etape => {
          this.etapeSelected=etape;
        },
        error => {
          // Handle any errors that occur during the HTTP request
          console.error('Error fetching etape:', error);
        }
      );
    });
    this.ServiceP.getPeintureByTransformateurId(this.transformateurId)
    .subscribe((result: Peinture[]) => {
      this.peintures = result;
    });
    }

    confirm(x: number, id: number) {
      // Find the peinture with the specified ID
      this.selectedPeinture = this.peintures.find(peinture => peinture.numerop === id);
      if (!this.selectedPeinture) {
        console.log('Peinture not found');
        return;
      }
      if (this.selectedPeinture.numerop === this.peintures[this.peintures.length - 1].numerop) {
      if(this.selectedPeinture.datePentiure!==null && this.selectedPeinture.observation!==null)
      {
      // Toggle properties between "C" and "NC"
      switch (x) {
        case 3:
          this.selectedPeinture.fuite = this.selectedPeinture.fuite === "C" ? "NC" : "C";
          break;
        case 4:
          this.selectedPeinture.penture = this.selectedPeinture.penture === "C" ? "NC" : "C";
          break;
        case 5:
          this.selectedPeinture.isolateur = this.selectedPeinture.isolateur === "C" ? "NC" : "C";
          break;
        case 6:
          this.selectedPeinture.marquage = this.selectedPeinture.marquage === "C" ? "NC" : "C";
          break;
        case 7:
          this.selectedPeinture.neutre = this.selectedPeinture.neutre === "C" ? "NC" : "C";
          break;
        case 8:
          this.selectedPeinture.terre = this.selectedPeinture.terre === "C" ? "NC" : "C";
          break;
        case 9:
          this.selectedPeinture.commut = this.selectedPeinture.commut === "C" ? "NC" : "C";
          break;
        case 10:
          this.selectedPeinture.soupage = this.selectedPeinture.soupage === "C" ? "NC" : "C";
          break;
        case 11:
          this.selectedPeinture.signature = this.selectedPeinture.signature === "C" ? "NC" : "C";
          break;
        case 12:
          this.selectedPeinture.vanne = this.selectedPeinture.vanne === "C" ? "NC" : "C";
          break;
        case 13:
          this.selectedPeinture.relais = this.selectedPeinture.relais === "C" ? "NC" : "C";
          break;
        case 14:
          this.selectedPeinture.doigt = this.selectedPeinture.doigt === "C" ? "NC" : "C";
          break;
        case 15:
          this.selectedPeinture.cosse = this.selectedPeinture.cosse === "C" ? "NC" : "C";
          break;
        default:
          console.log('Invalid x value:', x);
          break;
      }

      if (
        this.selectedPeinture.fuite === "C" && this.selectedPeinture.penture === "C" &&
        this.selectedPeinture.isolateur === "C" && this.selectedPeinture.marquage === "C" &&
        this.selectedPeinture.neutre === "C" && this.selectedPeinture.terre === "C" &&
        this.selectedPeinture.commut === "C" && this.selectedPeinture.soupage === "C" &&
        this.selectedPeinture.signature === "C" && this.selectedPeinture.vanne === "C" &&
        this.selectedPeinture.relais === "C" && this.selectedPeinture.doigt === "C" &&
        this.selectedPeinture.cosse === "C"
      ) {
        this.selectedPeinture.cnc = "C";
      }
      else if (
      this.selectedPeinture.fuite === "NC" || this.selectedPeinture.penture === "NC" ||
      this.selectedPeinture.isolateur === "NC" || this.selectedPeinture.marquage === "NC" ||
      this.selectedPeinture.neutre === "NC" || this.selectedPeinture.terre === "NC" ||
      this.selectedPeinture.commut === "NC" || this.selectedPeinture.soupage === "NC" ||
      this.selectedPeinture.signature === "NC" || this.selectedPeinture.vanne === "NC" ||
      this.selectedPeinture.relais === "NC" || this.selectedPeinture.doigt === "NC" ||
      this.selectedPeinture.cosse === "NC"
      )
      {
        this.selectedPeinture.cnc = "NC"
        const newPeinture : Peinture = {
          numero: this.transformateurId,
          numerop: this.selectedPeinture.numerop+1
        }
        this.ServiceP.addPeinture(newPeinture).subscribe(
          (response) => {
            console.log('Peinture added successfully:', response);
            this.ServiceP.updateListPeinture(this.peintures)
            .subscribe(
              () => {
                const lastPeinture = this.peintures[this.peintures.length - 1];

                if (lastPeinture.cnc === "C") {
                  this.etapeSelected.resultat = "Conforme";
                } else if (lastPeinture.cnc === "NC" || lastPeinture.cnc === null) {
                  this.etapeSelected.resultat = "Non conforme";
                }
                this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe({
                  next: (response) => {

                  },
                });
                window.location.reload();
              },
              error => {
                console.error('Failed to update peintures:', error);
                // Optionally, you can handle the error here, display a message to the user, or perform other actions
              }
            );
          },
          (error) => {
            console.error('Failed to add peinture:', error);
            // Handle error here
          }
        );
      }

      }
    }
  }
    update() {
      this.ServiceP.updateListPeinture(this.peintures)
        .subscribe(
          () => {

            const lastPeinture = this.peintures[this.peintures.length - 1];

            if (lastPeinture.cnc === "C") {
              this.etapeSelected.resultat = "Conforme";
            } else if (lastPeinture.cnc === "NC" || lastPeinture.cnc === null) {
              this.etapeSelected.resultat = "Non conforme";
            }



            if(this.ServiceS.Controleur.designation==="Controleur")
            {
              const newEvent = new Event(this.ServiceS.Controleur.idC, 'Participer a le Peinture'
              , new Date(),this.ServiceS.Controleur.username+" a Participer a le Peinture de le transformateur " + this.transformateurId);
              this.eventService.AddEvent(newEvent)
              .subscribe({
                next: (response) => {
                  console.log('Event added successfully:', response);
                // Update the etapeSelected
                this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe({
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
              const newEvent = new Event(this.ServiceS.Controleur.idC, 'Verifier le Peinture'
              , new Date(),this.ServiceS.Controleur.username+" a Verifier le Peinture de le transformateur " + this.transformateurId);
              this.eventService.AddEvent(newEvent)
              .subscribe({
                next: (response) => {
                  console.log('Event added successfully:', response);
                // Update the etapeSelected
                this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe({
                  next: (response) => {

                  },
                });
                },
                error: (error) => {
                  console.error('Error adding event:', error);
                }
              });
            }
            this.ServiceM.add({ severity: 'success', summary: 'Succès', detail: 'Peinture Sauvegarder avec succés' });
          },
          error => {
            console.error('Failed to update peintures:', error);
            // Optionally, you can handle the error here, display a message to the user, or perform other actions
          }
        );
    }

}
