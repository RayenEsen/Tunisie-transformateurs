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

  validateForm() {
    const values = Object.values(this.transformateurAjouter);
    return values.every(value => value);
  }


  submitForm() {
    try {
      this.transformateurAjouter.mtu2 = this.getI1();
      this.transformateurAjouter.bti2 = this.getI2();
      // Call your service method with the form data
      if (this.validateForm())
      {
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
              vt11: this.getintervalle(0.95,1.005),
              vt12: this.getintervalle(0.95,0.995),
              vt21: this.getintervalle(0.975,1.005),
              vt22: this.getintervalle(0.975,0.995),
              vt31: this.getP3(1.005),
              vt32: this.getP3(0.995),
              vt41: this.getintervalle(1.025,1.005),
              vt42: this.getintervalle(1.025,0.995),
              vt51: this.getintervalle(1.05,1.005),
              vt52: this.getintervalle(1.05,0.995),
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
      }
      alert("Tous les champs sont obligatoires");
    } catch (error) {
      // Handle other types of errors, if any
      console.error('Error adding Transformateur', error);
    }
  }
  getP3(MultiplyFactor: number): number {
    let result: number = 0;

    if (this.transformateurAjouter.couplage.toUpperCase() === "MONO") {
      result = (this.transformateurAjouter.mtu1 / this.transformateurAjouter.btu2) * 1000;
    } else if (this.transformateurAjouter.couplage.toUpperCase() === "YNYN") {
      result = (this.transformateurAjouter.mtu1 / this.transformateurAjouter.btu2) * 1000;
    } else if (this.transformateurAjouter.couplage.toUpperCase() === "DYN") {
      result =( ( this.transformateurAjouter.mtu1 / this.transformateurAjouter.mtu2) * 1000 )* Math.sqrt(3);
    } else {
      result = ( ( (this.transformateurAjouter.mtu1 /this.transformateurAjouter.mtu2) * 1000 )* Math.sqrt(3) )/ 2;
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
  getI1() {
    let Resultat: number = 0;


      const power: number = parseFloat(this.transformateurAjouter.power); // Convert string to number
      const mtu1: number = this.transformateurAjouter.mtu1; // Assuming mtu1 is a number

      if (this.transformateurAjouter.couplage.toUpperCase() === "MONO") {
        Resultat = power / mtu1;
      } else {
        Resultat = (power / mtu1) / Math.sqrt(3);
      }

      return Resultat;
    }
    getI2() {
      let Resultat: number = 0;


        const power: number = parseFloat(this.transformateurAjouter.power); // Convert string to number
        const btu2: number = this.transformateurAjouter.btu2; // Assuming mtu1 is a number

        if (this.transformateurAjouter.couplage.toUpperCase() === "MONO") {
          Resultat = (power / btu2) * 1000;
        } else {
          Resultat = ((power / btu2) * 1000) * Math.sqrt(3);
        }

        return Resultat;
      }
}
