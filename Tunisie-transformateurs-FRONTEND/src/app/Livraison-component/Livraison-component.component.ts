import { Component, OnInit } from '@angular/core';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Pv } from '../Shared/Pv-service.model';
import { PvServiceService } from '../Shared/Pv-service.service';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
@Component({
  selector: 'app-Livraison-component',
  templateUrl: './Livraison-component.component.html',
  styleUrls: ['./Livraison-component.component.css']
})
export class LivraisonComponentComponent implements OnInit {

  list: Transformateur[] = [];
  pv: Pv[] = [];

  constructor(public service: TransformateurServiceService, public ServicePv : PvServiceService, public ServiceC : ControlleurServiceService) { }

  ngOnInit() {
    this.service.refreshList2().subscribe({
      next: (res: Transformateur[]) => {
        res = res.filter(item => item.dateLivraison?.toString()!== '0001-01-01T00:00:00' )
        this.list = res;
        if (this.list.length > 0) {
          // Iterate through each item in this.list
          this.list.forEach((transformateur, index) => {
            this.ServicePv.getPvByTransformerId(transformateur.numero).subscribe({
              next: (response: Pv[]) => {
                if (response.length > 0) {

                  // Assign the Pv to the current item in this.list
                  this.list[index].pv = response[0];

                  // Check if id_C is defined in Pv
                  if (this.list[index].pv?.idC) {
                    const currentIndex = index as number;  // Cast index to number
                    this.ServiceC.getControleurById(this.list[currentIndex].pv!.idC)
                      .subscribe({
                        next: (result: ControleurDeQualite) => {
                          // Assuming the result is of type ControleurDeQualite
                          // Assign the ControleurDeQualite to the current Pv
                          console.log(this.list[index])
                          this.list[currentIndex].pv!.controleurDeQualite = result;
                        },

                    });
                  } else {
                    console.error('Error: Pv.id_C is undefined.');
                  }
                } else {
                  console.error('Error: Empty result for Pv.');
                }
              },
              error: (err: any) => {
                console.error('Error fetching Pv:', err);
              }
            });
          });
        } else {
          console.error('Error: this.list is empty.');
        }
      },

    });
  }


}
