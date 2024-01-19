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
              resultat: 'Aucun test',
              tappings: 5,
              vt11: undefined,
              vt12: undefined,
              vt21: undefined,
              vt22: undefined,
              vt31: undefined,
              vt32: undefined,
              vt41: undefined,
              vt42: undefined,
              vt51: undefined,
              vt52: undefined,
              vm11: undefined,
              vm12: undefined,
              vm13: undefined,
              vm21: undefined,
              vm22: undefined,
              vm23: undefined,
              vm31: undefined,
              vm32: undefined,
              vm33: undefined,
              vm41: undefined,
              vm42: undefined,
              vm43: undefined,
              vm51: undefined,
              vm52: undefined,
              vm53: undefined
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
  getP3(MultiplyFactor: number): number {
    let result: number = 0;

    if (this.service.list[0].couplage.toUpperCase() === "MONO") {
      result = (this.service.list[0].mtu1 / this.service.list[0].btu2) * 1000;
    } else if (this.service.list[0].couplage.toUpperCase() === "YNYN") {
      result = (this.service.list[0].mtu1 / this.service.list[0].btu2) * 1000;
    } else if (this.service.list[0].couplage.toUpperCase() === "DYN") {
      result =( ( this.service.list[0].mtu1 / this.service.list[0].mtu2) * 1000 )* Math.sqrt(3);
    } else {
      result = ( ( (this.service.list[0].mtu1 / this.service.list[0].mtu2) * 1000 )* Math.sqrt(3) )/ 2;
    }

    result = result * MultiplyFactor;
    // Do not call toFixed here, so the result is a number
    return result;
  }
  getPI(MultiplyFactor : number)
  {
    return this.getP3(1)*MultiplyFactor;
  }
  getintervalle(MultiplyFactor: number,x : number){
    return this.getPI(x)*MultiplyFactor;
  }
}
