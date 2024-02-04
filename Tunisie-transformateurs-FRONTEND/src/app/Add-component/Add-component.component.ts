import { Component, OnInit } from '@angular/core';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { Pv } from '../Shared/Pv-service.model';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { PvServiceService } from '../Shared/Pv-service.service';
import { Observable, concat, forkJoin, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionService } from '../utils/session-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { concatMap, toArray } from 'rxjs/operators';
import { Bobinage } from '../Shared/Bobinage-service.model';
import { BobinageServiceService } from '../Shared/Bobinage-service.service';
import { BobinageMTServiceService } from '../Shared/BobinageMT-service.service';
import { BobinageMT } from '../Shared/BobinageMT-service.model';

@Component({
  selector: 'app-Add-component',
  templateUrl: './Add-component.component.html',
  styleUrls: ['./Add-component.component.css']
})
export class AddComponentComponent implements OnInit {

  transformateurAjouter: Transformateur =
  {
    numero: 0,
    marque: 'Tunisie transformateurs',
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
    libelle: '',
    frequency: 0,
    date: new Date(),
    type: ''
  };

  constructor(public service: TransformateurServiceService,
     public servicePv: PvServiceService,
     private router: Router ,
     public serviceS : SessionService ,
     public serviceE : EtapeServiceService ,
     public ServiceB : BobinageServiceService,
     public ServiceMT : BobinageMTServiceService,
     ){ }

  ngOnInit() {

  }

  validateForm(): boolean {
    return Object.values(this.transformateurAjouter).every(value => value !== undefined && value !== '');
  }


  submitForm() {
    try {
      // Call service method to add Transformateur
      this.transformateurAjouter.mtu2 = this.getI1();
      this.transformateurAjouter.bti2 = this.getI2();
      if (!this.validateForm()) {
        alert("Tout les champs sont obligatoires");
        return;
      }

      this.service.AddTransformateur(this.transformateurAjouter)
        .pipe(
          concatMap(() => {
            // Create PvAjouter using the correct id_t
            const pvAjouter: Pv = {
              id_pv: 0, // This will be populated by the server
              id_t: this.transformateurAjouter.numero,
              date: new Date(),
              resultat: 'En Attente',
              tappings: 5,
              vt11: this.getintervalle(0.95, 1.005),
              vt12: this.getintervalle(0.95, 0.995),
              vt21: this.getintervalle(0.975, 1.005),
              vt22: this.getintervalle(0.975, 0.995),
              vt31: this.getP3(1.005),
              vt32: this.getP3(0.995),
              vt41: this.getintervalle(1.025, 1.005),
              vt42: this.getintervalle(1.025, 0.995),
              vt51: this.getintervalle(1.05, 1.005),
              vt52: this.getintervalle(1.05, 0.995),
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
              vm53: undefined,
              na0: undefined,
              nb0: undefined,
              nc0: undefined,
              na1: undefined,
              nb2: undefined,
              nc3: undefined,
              wog: undefined,
              iog: undefined,
              iom: undefined,
              wom: undefined,
              zccg: undefined,
              wccg: undefined,
              temp: undefined,
              uccm: undefined,
              wccm1: undefined,
              wccm2: undefined,
              zccm1: undefined,
              zcmm2: undefined,
              u1: undefined,
              t1: undefined,
              u2: undefined,
              t2: undefined,
              u3: undefined,
              t3: undefined,
              claquage: undefined,
              idC: this.serviceS.Controleur.idC,
              version: 0
            };

            // Call service method to add Pv
            return this.servicePv.AddPv(pvAjouter);
          }),
          concatMap(() => {
            // Use forkJoin to execute multiple observables in parallel
            const bobinageObservables: Observable<any>[] = [];

            const BobinageNames: { [key: number]: string } = {
              1: 'Diemnsion du fil',
              2: 'Nombre de ful/spire',
              3: 'Diamètre inter Bobine(d)',
              4: 'Diamètre Ext bobine(d)',
              5: 'Epaisseur entre couche',
              6: 'Nombre de spire / couche',
              7: 'Nombre de spires Totales',
              8: 'Hauteur de bobinage (h)',
              9: 'Hauteur de la bobine (H)',
            };

            for (let i = 1; i <= 9; i++) {
              const BobinageAjouter: Bobinage = {
                idBobinage: 0,
                numero: this.transformateurAjouter.numero,
                nom: BobinageNames[i] || ''
              };
              bobinageObservables.push(this.ServiceB.AddBobinage(BobinageAjouter));
            }

            return forkJoin(bobinageObservables);
          }),
          concatMap(() => {
            // Use forkJoin to execute multiple observables in parallel
            const bobinageMTObservables: Observable<any>[] = [];

            const BobinageMTNames: { [key: number]: string } = {
              1: 'Diemnsion du fil',
              2: 'Nombre de ful/spire',
              3: 'Diamètre inter Bobine(d)',
              4: 'Diamètre Ext bobine(d)',
              5: 'Epaisseur entre couche',
              6: 'Nombre de spire / couche',
              7: 'Nombre de spires Totales',
              8: 'Hauteur de bobinage (h)',
              9: 'Hauteur de la bobine (H)',
            };

            for (let i = 1; i <= 9; i++) {
              const BobinageMTAjouter: BobinageMT = {
                idBobinageMT: 0,
                numero: this.transformateurAjouter.numero,
                nom: BobinageMTNames[i] || ''
              };
              bobinageMTObservables.push(this.ServiceMT.AddBobinage(BobinageMTAjouter));
            }

            return forkJoin(bobinageMTObservables);
          }),
          concatMap(() => {
            // Use forkJoin to execute multiple observables in parallel
            const etapeObservables: Observable<any>[] = [];

            const etapeNames: { [key: number]: string } = {
              1: 'BT1',
              2: 'BT2',
              3: 'BT3',
              4: 'MT1',
              5: 'MT2',
              6: 'MT3',
              7: 'Decoupage CM',
              8: 'Montage CM',
              9: 'Calage',
              10: 'Fermeture',
              11: 'Cablage BT',
              12: 'Cablage MT',
              13: 'Etuvage',
              14: 'Ecuvage',
              15: 'Huile',
              16: 'Peinture',
              17: 'Finir'
            };

            for (let i = 1; i <= 17; i++) {
              const etapeAjouter: Etape = {
                id_Etape: 0,
                etapeNumero: i,
                numero: this.transformateurAjouter.numero,
                dateDebut: undefined,
                dateFin: undefined,
                nom: etapeNames[i] || '',
                operateur1: '',
                operateur2: ''
              };
              etapeObservables.push(this.serviceE.AddEtape(etapeAjouter));
            }

            return forkJoin(etapeObservables);
          })
        )
        .subscribe({
          next: (results: any) => {
            console.log('Transformateur, Bobinage, and Etape added successfully', results);
            // Navigate or perform other actions on successful completion
            this.router.navigate(['/Transformateur']);
          },
          error: (error: any) => {
            alert("Tout les champs sont obligatoires");
            console.error('Error adding Transformateur, Pv, Bobinage, or Etapes', error);
          }
        });
    } catch (error) {
      alert("Le champ 'numero' est obligatoire");
      console.error('Error adding Transformateur', error);
      return;
    }
  }



  getP3(MultiplyFactor: number): number {
    let result: number = 0;

    if (this.transformateurAjouter.couplage.toUpperCase() === "MONO") {
      result = (this.transformateurAjouter.mtu1 / this.transformateurAjouter.btu2) * 1000;
    } else if (this.transformateurAjouter.couplage.toUpperCase() === "YNYN") {
      result = (this.transformateurAjouter.mtu1 / this.transformateurAjouter.btu2) * 1000;
    } else if (this.transformateurAjouter.couplage.toUpperCase() === "DYN") {
      result =( ( this.transformateurAjouter.mtu1 / this.transformateurAjouter.btu2) * 1000 )* Math.sqrt(3);
    } else {
      result = ( ( (this.transformateurAjouter.mtu1 /this.transformateurAjouter.btu2) * 1000 )* Math.sqrt(3) )/ 2;
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
          Resultat =( ((power / btu2) ) / Math.sqrt(3) )*1000;
        }
        return Resultat;
      }
}
