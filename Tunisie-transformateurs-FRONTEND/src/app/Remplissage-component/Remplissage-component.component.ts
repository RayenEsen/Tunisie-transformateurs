import { Component, OnInit } from '@angular/core';
import { RemplissageServiceService } from '../Shared/Remplissage-service.service';
import { Remplissage} from '../Shared/Remplissage-service.model';
import { SessionService } from '../utils/session-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { EventServiceService } from '../Shared/Event-service.service';
import { Event } from '../Shared/Event-service.model';
import { Etape } from '../Shared/Etape-servicemodel';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-Remplissage-component',
  templateUrl: './Remplissage-component.component.html',
  styleUrls: ['./Remplissage-component.component.css']
})
export class RemplissageComponentComponent implements OnInit {

  etapenumero:number = 0;
  transformateurId: number = 0;
  remplissages: Remplissage[] = [];
  etapeSelected: Etape = new Etape;
  etapeSelected2: Etape = new Etape;

  remplissageSelected?: Remplissage | undefined;
  constructor(public ServiceE : EtapeServiceService,public ServiceRemplissage : RemplissageServiceService,public router: Router,private route: ActivatedRoute,public service : TransformateurServiceService , public serviceS : SessionService , public eventService : EventServiceService, public messageService : MessageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero= +params['etapenumero'] || 0;

      this.service.GetTransformateur(this.transformateurId);
      this.ServiceRemplissage.getRemplissagesByTransformateurId(this.transformateurId)
      .subscribe(
        (result: Remplissage[]) => {
          this.remplissages = result;
          console.log(this.remplissages);
        },
        (error) => {
          // Handle error
          console.error('An error occurred:', error);
          // Optionally, you can set a default value or perform other actions here
        }
      );

        });
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

        this.ServiceE.getEtapeByNumeroAndTransformateur(this.etapenumero+1,this.transformateurId)
        .subscribe(
          etape => {
            this.etapeSelected2=etape;
          },
          error => {
            // Handle any errors that occur during the HTTP request
            console.error('Error fetching etape:', error);
          }
        );
   }
    // Function to handle the print action
    onPrint() {
      window.print();
    }


    Confirm(id: number) {
      // Find the remplissage with the specified ID
      this.remplissageSelected = this.remplissages.find(remplissage => remplissage.idRemplissage === id);
      if (!this.remplissageSelected) {
        return;
      }
      if (this.remplissageSelected.cnc==="NC")
      {
        const NewRemplissage : Remplissage = {
          numero: this.transformateurId,
          idRemplissage: 0
        }
        this.ServiceRemplissage.addRemplissage(NewRemplissage).subscribe({
          next : (Response) =>
          {
            this.remplissages.push(Response)
            this.ServiceRemplissage.updateListRemplissage(this.remplissages).subscribe({
              next : (response) =>
              {
              }
            })
          }
        })
      }
    }


    update() {

      if (this.remplissages.length > 0) {
        const lastRemplissage = this.remplissages[this.remplissages.length - 1];
        if (lastRemplissage.cnc === "C") {
            this.etapeSelected.resultat = "Conforme";
            this.etapeSelected2.resultat = "Conforme";
        } else if (lastRemplissage.cnc === null) {
            this.etapeSelected.resultat = "Non conforme";
            this.etapeSelected2.resultat = "Non conforme";
        }
    }


      if(this.serviceS.Controleur.designation==="Controleur" && this.serviceS.Controleur.username)
      {
        this.etapeSelected.controleur=this.serviceS.Controleur.username;
      }
      if(this.serviceS.Controleur.designation==="Verificateur" && this.serviceS.Controleur.username)
      {
        this.etapeSelected.verificateur=this.serviceS.Controleur.username;
      }
      // Call the service method to update Magnetiques
      this.ServiceRemplissage.updateListRemplissage(this.remplissages).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Remplissage et Etancheite mis à jour avec succès' });

            if(this.serviceS.Controleur.designation==="Controleur")
            {
              const newEvent = new Event(this.serviceS.Controleur.idC, 'Participer a le Remplissage et le etancheite'
              , new Date(),this.serviceS.Controleur.username+" a Participer a le Remplissage et le etancheite de le transformateur " + this.transformateurId);
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

                },
                error: (error) => {
                  console.error('Error adding event:', error);
                }
              });
            }
            else
            {
              const newEvent = new Event(this.serviceS.Controleur.idC, 'Verifier le Remplissage'
              , new Date(),this.serviceS.Controleur.username+" a Verifier le Remplissage de le transformateur " + this.transformateurId);
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


                },
                error: (error) => {
                  console.error('Error adding event:', error);
                }
              });
            }
          },
          error => {
              console.error('Error updating Remplissage:', error);
          }
      );
  }
  allInputsFilled(remplissage: any): boolean {
    return remplissage.datet && remplissage.pressiond && remplissage.pressionf && remplissage.hd && remplissage.hf && remplissage.observations;
  }
  handleEnter(index: number, nextInput: HTMLInputElement): void {
    if (index < this.remplissages.length ) {
      nextInput.focus();
    }
  }
}
