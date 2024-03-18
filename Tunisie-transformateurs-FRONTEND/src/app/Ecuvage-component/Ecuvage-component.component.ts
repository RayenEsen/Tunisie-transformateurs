import { Component, OnInit } from '@angular/core';
import { EcuvageServiceService } from '../Shared/Ecuvage-service.service';
import { Ecuvage } from '../Shared/Ecuvage-service.model';
import { SessionService } from '../utils/session-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { EcuvageValues } from '../Shared/EcuvageValues-service.model';
import { EcuvageValuesServiceService } from '../Shared/EcuvageValues-service.service';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { EventServiceService } from '../Shared/Event-service.service'
import { Event } from '../Shared/Event-service.model'
@Component({
  selector: 'app-Ecuvage-component',
  templateUrl: './Ecuvage-component.component.html',
  styleUrls: ['./Ecuvage-component.component.css']
})
export class EcuvageComponentComponent implements OnInit {


  etapenumero:number = 0;
  transformateurId: number = 0;
  ecuvages: Ecuvage[] = [];
  ecuvagesValues: EcuvageValues[] = [];
  etapeSelected : Etape = new Etape;
  etapeSelected2 : Etape = new Etape;
  constructor(public eventService : EventServiceService,public ServiceE : EtapeServiceService,public ServiceS : SessionService,public ServiceEcu : EcuvageServiceService,public router: Router,private route: ActivatedRoute,public service : TransformateurServiceService, public ServiceEV : EcuvageValuesServiceService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero= +params['etapenumero'] || 0;

      this.service.GetTransformateur(this.transformateurId);
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
      this.ServiceEcu.getEcuvageByTransformateurId(this.transformateurId).subscribe({
        next: (ecuvage: Ecuvage[]) => {
          this.ecuvages = ecuvage;
          console.log(this.ecuvages);
        }
      });

      this.ServiceEV.getEcuvageValuesByTransformateurId(this.transformateurId).subscribe({
        next: (response) => {
          this.ecuvagesValues = response;
          // Check if ecuvageValues for this transformateurId exists
          const existingEcuvageValues = this.ecuvagesValues.find(ev => ev.numero === this.transformateurId);
          if (!existingEcuvageValues) {
            // If not, create a new one
            const ecuvageValuesAjouter: EcuvageValues = {
              idEcuvageValues: 0,
              numero: this.transformateurId,
              v1: 0,
              v2: 0,
              v3: 0,
              v4: 0,
              v5: 0,
              v6: 0,
              v7: 0,
              v8: 0,
              v9: 0
            };
            this.ServiceEV.AddEcuvageValues(ecuvageValuesAjouter).subscribe({
              next: (response) => {
                this.ecuvagesValues=response;
              }
            });
          }
        }
      });
  }


    // Function to handle the print action
    onPrint() {
      window.print();
    }

    conforme(id : number)
    {
     const ecuvage =  this.ecuvages.find(ecuvage => ecuvage.idMagnetique === id);
     ecuvage!.conformite="Yes";
    }

    conformepas(id : number)
    {
     const ecuvage =  this.ecuvages.find(ecuvage => ecuvage.idMagnetique === id);
     ecuvage!.conformite="No";
    }

    update() {
      if (this.ecuvages.every(Ecuvage => Ecuvage.conformite === "Yes"))
      {
        this.etapeSelected.resultat="Conforme"
        this.etapeSelected2.resultat="Conforme"
      }
      if (this.ecuvages.some(Ecuvage => Ecuvage.conformite === "No"))
      {
        this.etapeSelected.resultat="Non conforme"
        this.etapeSelected2.resultat="Non conforme"
      }
      this.ServiceEcu.UpdateListEcuvage(this.ecuvages).subscribe({
        next: (response) => {
          // Handle successful response here
          console.log(response);
        },
        error: (error) => {
          // Handle error response here
          console.error(error);
        }
      });
      this.ServiceEV.updateEcuvageValuesByTransformateurId(this.transformateurId,this.ecuvagesValues[0].idEcuvageValues,this.ecuvagesValues[0]).subscribe({
        next : (Response) =>
        {
          this.ecuvagesValues = Response;
        }
      });

      if(this.ServiceS.Controleur.designation==="Controleur")
      {
        const newEvent = new Event(this.ServiceS.Controleur.idC, 'Participer a L"euvage'
        , new Date(),this.ServiceS.Controleur.username+" a Participer a L'euvagede le transformateur " + this.transformateurId);
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
        const newEvent = new Event(this.ServiceS.Controleur.idC, 'Verifier L"euvage'
        , new Date(),this.ServiceS.Controleur.username+" a Verifier L'euvage de le transformateur " + this.transformateurId);
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

    }


}
