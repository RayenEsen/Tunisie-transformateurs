import { Component, OnInit } from '@angular/core';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { Pv } from '../Shared/Pv-service.model';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { PvServiceService } from '../Shared/Pv-service.service';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-Add-component',
  templateUrl: './Add-component.component.html',
  styleUrls: ['./Add-component.component.css']
})
export class AddComponentComponent implements OnInit {

  transformateurAjouter: Transformateur =
  {
    numero: 0,
    marque: '',
    client: '',
    norme: '',
    power: '',
    mtu1: 0,
    mtu2: 0,
    btu2: 0,
    bti2: 0,
    nbphase: 0,
    prises: '',
    couplage: '',
    cooling: '',
    frequency: 0
  };

  constructor(public service: TransformateurServiceService, public servicePv: PvServiceService) { }

  ngOnInit() {
  }

  submitForm() {
    try {
      // Call your service method with the form data
      this.service.AddTransformateur(this.transformateurAjouter)
        .pipe(
          switchMap((response: any) => {
            // Create PvAjouter using the correct id_t
            const pvAjouter: Pv = {
              id_pv: 0, // This will be populated by the server
              id_t: this.transformateurAjouter.numero,
              date: new Date(),
              resultat: 'Aucun test'
            };

            // Use forkJoin to combine multiple observables
            return forkJoin([
              of(response), // The response from AddTransformateur
              this.servicePv.AddPv(pvAjouter) // Observable from AddPv
            ]);
          })
        )
        .subscribe({
          next: ([transformateurResponse, pvResponse]) => {
            console.log('Transformateur added successfully', transformateurResponse);
            console.log('Pv added successfully', pvResponse);
          },
          error: error => {
            console.error('Error adding Transformateur or Pv', error);
          }
        });
    } catch (error) {
      // Handle other types of errors, if any
      console.error('Error adding Transformateur', error);
    }
  }
}
