import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BobinageMTServiceService } from '../Shared/BobinageMT-service.service';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { BobinageMT } from '../Shared/BobinageMT-service.model';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { SessionService } from '../utils/session-service.service';

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

  constructor(
    public ServiceMT: BobinageMTServiceService,
    public router: Router,
    private route: ActivatedRoute,
    public service: TransformateurServiceService,
    public ServiceE: EtapeServiceService,
    public ServiceS: SessionService
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
      );
    });
  }
  Update() {
    // Call the service method to update bobinages
    this.ServiceMT.UpdateListBobinage(this.bobinagesMT).subscribe(
        () => {
            console.log('Bobinages updated successfully');
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
