import { Component, OnInit } from '@angular/core';
import { EcuvageServiceService } from '../Shared/Ecuvage-service.service';
import { Ecuvage } from '../Shared/Ecuvage-service.model';
import { SessionService } from '../utils/session-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { EcuvageValues } from '../Shared/EcuvageValues-service.model';
import { EcuvageValuesServiceService } from '../Shared/EcuvageValues-service.service';
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

  constructor(public ServiceEcu : EcuvageServiceService,public router: Router,private route: ActivatedRoute,public service : TransformateurServiceService, public ServiceEV : EcuvageValuesServiceService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.service.GetTransformateur(this.transformateurId);
      
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
                console.log(response);
              }
            });
          }
        }
      });
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
      })
    }


}
