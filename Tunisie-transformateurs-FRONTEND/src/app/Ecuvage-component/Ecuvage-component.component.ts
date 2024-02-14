import { Component, OnInit } from '@angular/core';
import { EcuvageServiceService } from '../Shared/Ecuvage-service.service';
import { Ecuvage } from '../Shared/Ecuvage-service.model';
import { SessionService } from '../utils/session-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';

@Component({
  selector: 'app-Ecuvage-component',
  templateUrl: './Ecuvage-component.component.html',
  styleUrls: ['./Ecuvage-component.component.css']
})
export class EcuvageComponentComponent implements OnInit {


  etapenumero:number = 0;
  transformateurId: number = 0;
  ecuvages: Ecuvage[] = [];

  constructor(public ServiceEcu : EcuvageServiceService,public router: Router,private route: ActivatedRoute,public service : TransformateurServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.service.GetTransformateur(this.transformateurId);
    });
    this.ServiceEcu.getEcuvageByTransformateurId(this.transformateurId).subscribe({
      next : (ecuvage: Ecuvage[]) =>
      {
        this.ecuvages=ecuvage;
        console.log(this.ecuvages)
      }
    })
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
    }


}
