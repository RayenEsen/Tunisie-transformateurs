import { Component, OnInit } from '@angular/core';
import { BobinageServiceService } from '../Shared/Bobinage-service.service'
import { Bobinage } from '../Shared/Bobinage-service.model'
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { SessionService } from '../utils/session-service.service';
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
  constructor(public ServiceB : BobinageServiceService,public router: Router,private route: ActivatedRoute , public service : TransformateurServiceService , public ServiceE : EtapeServiceService , public ServiceS : SessionService) { }

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
    });
  }

  Update() {
    // Call the service method to update bobinages
    this.ServiceB.UpdateListBobinage(this.bobinages).subscribe(
      () => {
        console.log('Bobinages updated successfully');
      },
      error => {
        console.error('Error updating bobinages:', error);
      }
    );

    if (this.ServiceS.Controleur.designation === "Controleur") {
      // Update etapeSelected.idC with the value from the session's Controleur Id
      this.etapeSelected.idC = this.ServiceS.Controleur.idC;
      this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe(
        () => {
          console.log(this.etapeSelected);
        },
        error => {
          console.error('Error updating bobinages:', error);
        }
      );
    }
  }


    // Function to handle the print action
    onPrint() {
      window.print();
    }
}
