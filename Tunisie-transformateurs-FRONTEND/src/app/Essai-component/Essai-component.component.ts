  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
  import { Pv } from '../Shared/Pv-service.model';
  import { PvServiceService } from '../Shared/Pv-service.service';

  @Component({
    selector: 'app-Essai-component',
    templateUrl: './Essai-component.component.html',
    styleUrls: ['./Essai-component.component.css']
  })
  export class EssaiComponentComponent implements OnInit {

    currentDate: string = '';
    transformateurId: number = 0;
    pv: Pv[] = [];

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      public service: TransformateurServiceService,
      public pvService: PvServiceService
    ) { }

    ngOnInit() {

      this.getCurrentDate();
      this.route.params.subscribe(params => {
        this.transformateurId = +params['id'] || 0;

        if (this.transformateurId) {
          this.service.GetTransformateur(this.transformateurId);
          console.log('Transformateur Data:', this.service.list);
        }
        this.pvService.getPvByTransformerId(this.transformateurId).subscribe(
          (pvData: Pv[]) => {
            this.pv = pvData;
            console.log('Pv Data:', this.pv);
          },
          error => {
            console.error('Error fetching Pv data:', error);
          }
        );
      }
      );
    }
    savePvValues() {
      if (this.pv && this.pv.length > 0 && this.pv[0].id_pv !== undefined) {
        this.pv[0].zccm1=this.getZccPourcentage();
        // Call a service method to update the Pv values on the server
        this.pvService.UpdatePv(this.pv[0].id_pv, this.pv[0]).subscribe(
          response => {
            console.log('Pv values updated successfully', response);

            // Redirect the user to the specified page
            this.router.navigate(['/Ajouter_Transformateur/', this.transformateurId]);
          },
          error => {
            console.error('Error updating Pv values', error);
          }
        );
      }
    }

    getCurrentDate() {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

      // Format the date as "DD/MM/YYYY"
      this.currentDate = today.toLocaleDateString('en-US', options);
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
        result = ( ( (this.service.list[0].mtu1 /this.service.list[0].mtu2) * 1000 )* Math.sqrt(3) )/ 2;
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


        const power: number = parseFloat(this.service.list[0].power); // Convert string to number
        const mtu1: number = this.service.list[0].mtu1; // Assuming mtu1 is a number

        if (this.service.list[0].couplage.toUpperCase() === "MONO") {
          Resultat = power / mtu1;
        } else {
          Resultat = (power / mtu1) / Math.sqrt(3);
        }

        return Resultat;
      }
      getI2() {
        let Resultat: number = 0;


          const power: number = parseFloat(this.service.list[0].power); // Convert string to number
          const btu2: number = this.service.list[0].btu2; // Assuming mtu1 is a number

          if (this.service.list[0].couplage.toUpperCase() === "MONO") {
            Resultat = (power / btu2) * 1000;
          } else {
            Resultat =( ((power / btu2) ) / Math.sqrt(3) )*1000;
          }

          return Resultat;
        }

    // Function to handle the print action
    onPrint() {
      window.print();

    }

    getIOPourcentageMesurees()
    {
      return (this.service.list[0].mtu2 / this.service.list[0].bti2) * 100
    }
    getZccPourcentage()
    {
      if (this.pv[0].uccm !== undefined)
      {
        return (this.pv[0].uccm / (this.service.list[0].mtu1*10))
      }
      else return 0;
    }
  }
