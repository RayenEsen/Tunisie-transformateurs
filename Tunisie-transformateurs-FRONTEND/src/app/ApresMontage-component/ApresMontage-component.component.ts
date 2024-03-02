import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Electrique } from '../Shared/electrique-service.model'
import { ElectriqueServiceService } from '../Shared/electrique-service.service'
import { Partie2 } from '../Shared/Partie2-service.model'
import { Partie2ServiceService } from '../Shared/Partie2-service.service'

@Component({
  selector: 'app-ApresMontage-component',
  templateUrl: './ApresMontage-component.component.html',
  styleUrls: ['./ApresMontage-component.component.css']
})
export class ApresMontageComponentComponent implements OnInit {


  transformateurId: number = 0;
  electriques : Electrique[] = [];
  partie2 : Partie2[] = [];
  constructor(private route: ActivatedRoute ,  public service : TransformateurServiceService , public serviceElectrique : ElectriqueServiceService , public ServicePartie2 : Partie2ServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.service.GetTransformateur(this.transformateurId);
    }),
    this.serviceElectrique.getElectriqueByTransformateurId(this.transformateurId).subscribe({
      next: (electrique: Electrique[]) => {
        {
        this.electriques=electrique;
      }
    }
  });
  this.ServicePartie2.getPartie2ByTransformateurId(this.transformateurId).subscribe({
    next: (partie2: Partie2[]) => {
      {
      this.partie2=partie2;
      console.log(this.partie2)
    }
  }
});
}

  update() {
    this.serviceElectrique.UpdateListElectrique(this.electriques).subscribe({
      next: (response: Electrique[]) => {
        console.log("Electrique Updated successfully");
      },
      error: (error) => {
        console.error("Error updating Electriques:", error);
        // Handle error appropriately, such as displaying an error message to the user
      }
    });
    this.ServicePartie2.UpdateListPartie2(this.partie2).subscribe({
      next: (response: Partie2[]) => {
        console.log("Partie 2 Updated successfully");
      },
      error: (error) => {
        console.error("Error updating Partie 2:", error);
        // Handle error appropriately, such as displaying an error message to the user
      }
    });
  }


    // Function to handle the print action
    onPrint() {
      window.print();
    }
}
