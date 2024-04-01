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
import { Message, MessageService } from 'primeng/api';
@Component({
  selector: 'app-Magnetique-component',
  templateUrl: './Magnetique-component.component.html',
  styleUrls: ['./Magnetique-component.component.css']
})
export class MagnetiqueComponentComponent implements OnInit {

  transformateurId: number = 0;
  Magnetiques: Magnetique[] = [];
  etapeSelected : Etape = new Etape;
  etapeSelected2 : Etape = new Etape;

  etapenumero:number = 0;

  constructor(public ServiceM : MagnetiqueServiceService,
              public router: Router,
              private route: ActivatedRoute ,
              public service : TransformateurServiceService,
              public serviceS : SessionService,
              public serviceE : EtapeServiceService,
              public eventService : EventServiceService,
              public messageService : MessageService,
              ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero= +params['etapenumero'] || 0;
      if (this.transformateurId) {
        this.ServiceM.getMagnetiqueByTransformateurId(this.transformateurId)
          .subscribe((result: Magnetique[]) => {
            this.Magnetiques = result;
          });
          this.service.GetTransformateur(this.transformateurId);
      }
      this.serviceE.getEtapeByNumeroAndTransformateur(this.etapenumero,this.transformateurId)
      .subscribe(
        etape => {
          this.etapeSelected=etape;
        },
        error => {
          // Handle any errors that occur during the HTTP request
          console.error('Error fetching etape:', error);
        }
      );
      this.serviceE.getEtapeByNumeroAndTransformateur(this.etapenumero+1,this.transformateurId)
      .subscribe(
        etape => {
          this.etapeSelected2=etape;
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

          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Controle dimensionnelle circuit magnétique mis à jour avec succès' });

          if (this.Magnetiques.every(Magnetique => Magnetique.cnc1 === "C") && this.Magnetiques.every(Magnetique => Magnetique.cnc2 === "C") && this.Magnetiques.every(Magnetique => Magnetique.cnc3 === "C") && this.Magnetiques.every(Magnetique => Magnetique.cnc4 === "C"))
          {
            this.etapeSelected.resultat="Conforme"
            this.etapeSelected2.resultat="Conforme"
          }


          if (this.Magnetiques.some(Magnetique => Magnetique.cnc1 === "NC") || this.Magnetiques.some(Magnetique => Magnetique.cnc2 === "NC") || this.Magnetiques.some(Magnetique => Magnetique.cnc3 === "NC") || this.Magnetiques.some(Magnetique => Magnetique.cnc4 === "NC"))
          {
            this.etapeSelected.resultat="Non conforme"
            this.etapeSelected2.resultat="Non conforme"
          }

            if(this.serviceS.Controleur.designation==="Controleur" && this.serviceS.Controleur.username)
            {
              this.etapeSelected.controleur=this.serviceS.Controleur.username;
            }
            if(this.serviceS.Controleur.designation==="Verificateur" && this.serviceS.Controleur.username)
            {
              this.etapeSelected.verificateur=this.serviceS.Controleur.username;
            }
            if(this.serviceS.Controleur.designation==="Controleur")
            {
              const newEvent = new Event(this.serviceS.Controleur.idC, 'Participer a le Controle dimensionnelle circuit magnetique'
              , new Date(),this.serviceS.Controleur.username+" a Participer a le Controle dimensionnelle circuit magnetique de le transformateur " + this.transformateurId);
              this.eventService.AddEvent(newEvent)
              .subscribe({
                next: (response) => {
+                // Update the etapeSelected
                this.serviceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe({
                  next: (response) => {
                  },
                });

                this.serviceE.UpdateEtape(this.transformateurId, this.etapenumero+1, this.etapeSelected2).subscribe({
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
              const newEvent = new Event(this.serviceS.Controleur.idC, 'Verifier le Controle dimensionnelle circuit magnetique'
              , new Date(),this.serviceS.Controleur.username+" a Verifier le Controle dimensionnelle circuit magnetique de le transformateur " + this.transformateurId);
              this.eventService.AddEvent(newEvent)
              .subscribe({
                next: (response) => {
                  console.log('Event added successfully:', response);
                // Update the etapeSelected
                this.serviceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe({
                  next: (response) => {

                  },
                });

                this.serviceE.UpdateEtape(this.transformateurId, this.etapenumero+1, this.etapeSelected2).subscribe({
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
            console.error('Error updating Magnetiques:', error);
        }
    );
}

    // Function to handle the print action
    onPrint() {
      window.print();

    }
    handleEnter(index: number, nextInput: HTMLInputElement): void {
      if (index < this.Magnetiques.length) {
        nextInput.focus();
      }
    }

}
