import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { SessionService } from '../utils/session-service.service';
import { Router } from '@angular/router';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';

@Component({
  selector: 'app-Controle-component',
  templateUrl: './Controle-component.component.html',
  styleUrls: ['./Controle-component.component.css']
})
export class ControleComponentComponent implements OnInit {

  transformateurId: number = 0;
  etapes: Etape[] = []; // Array to store fetched Etapes

  constructor(
    private route: ActivatedRoute,
    public serviceE: EtapeServiceService,
    public ServiceS: SessionService,
    private router: Router, // Add this line to inject the Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;

      // Fetch Etapes by Transformateur id
      this.serviceE.getEtapesByTransformateurId(this.transformateurId)
        .subscribe(
          etapes => {
            console.log(etapes);
            this.etapes = etapes; // Store fetched Etapes in the array
          },
          error => {
            console.error('Error loading Etapes', error);
          }
        );
    });
  }

  updateEtape(etapeNumero: number) {
    const selectedEtape = this.etapes.find(et => et.etapeNumero === etapeNumero);

    if (selectedEtape) {
      // Assuming ServiceS.Controleur is the Controleur from the session
      const sessionControleur = this.ServiceS.Controleur;

      if (sessionControleur) {
        // Check if there are existing controleurs
        if (!selectedEtape.controleurs) {
          // If no controleurs, add the Controleur from the session
          selectedEtape.controleurs = [this.ServiceS.Controleur];
        } else if (
          selectedEtape.controleurs.length < 2 &&
          !this.isUserAlreadyAssigned(sessionControleur, selectedEtape.controleurs)
        ) {
          // If there is space and the user is not already assigned, add the Controleur from the session
          selectedEtape.controleurs.push(this.ServiceS.Controleur);

          // Call the UpdateEtape method with the updated Etape
          this.serviceE.UpdateEtape(this.transformateurId, etapeNumero, selectedEtape)
            .subscribe(
              () => {
                console.log('Etape updated successfully');

                // Navigate to /BT/:id after a successful update
                this.router.navigate([`/BT/${this.transformateurId}`]);
              },
              error => {
                console.error('Error updating Etape', error);
                // Handle error, e.g., show an error message to the user
              }
            );
        } else {
          // If there are already two controleurs or the user is already assigned, navigate without updating
          if (selectedEtape.controleurs.length >= 2) {
            alert('This Etape is full');
          } else {
            this.router.navigate([`/BT/${this.transformateurId}`]);
          }
        }
      } else {
        console.error('Controleur not found in the session');
        // Handle the case where Controleur is not found in the session
      }
    }
  }


// Method to check if the user is already assigned to the Etape
isUserAlreadyAssigned(currentUser: ControleurDeQualite, controleurs: ControleurDeQualite[]): boolean {
  // Check if the current user is already in the controleurs list
  return controleurs.some(controleur => controleur.idC === currentUser.idC);
}

}
