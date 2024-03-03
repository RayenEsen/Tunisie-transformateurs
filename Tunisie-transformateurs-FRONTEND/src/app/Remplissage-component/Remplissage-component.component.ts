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
  remplissageSelected?: Remplissage | undefined;
  constructor(public ServiceE : EtapeServiceService,public ServiceRemplissage : RemplissageServiceService,public router: Router,private route: ActivatedRoute,public service : TransformateurServiceService , public serviceS : SessionService , public eventService : EventServiceService) { }

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
            console.log(this.etapeSelected);
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
        console.log('Remplissage not found');
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
          }
        })
      }
    }


    update() {
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
              console.log('Remplissage updated successfully');
              // Creating and adding the event
              const newEvent = new Event(
                this.serviceS.Controleur.idC, // Argument 1
                'Participer a le Remplissage et l"etancheite ', // Argument 2
                new Date(), // Argument 3
                "Pour le transformateur " + this.transformateurId + "." // Argument 4
              );
              this.eventService.AddEvent(newEvent)
              .subscribe({
              next: (response) => {
              console.log('Event added successfully:', response);
              // Add any further logic here if needed
              // Update the etapeSelected
              this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe({
                next: (response) => {
                  console.log('Etape updated successfully:', response);
                  // Handle the response as needed
                },
              });
              },
              error: (error) => {
              console.error('Error adding Remplissage:', error);
              // Handle the error appropriately
              }
              });
          },
          error => {
              console.error('Error updating Remplissage:', error);
          }
      );
  }

}
