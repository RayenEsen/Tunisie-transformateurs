  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
  import { Pv } from '../Shared/Pv-service.model';
  import { PvServiceService } from '../Shared/Pv-service.service';
import { SessionService } from '../utils/session-service.service';

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
      public pvService: PvServiceService,
      public ServiceS : SessionService
    ) { }

    ngOnInit() {
      this.getCurrentDate();
      this.route.params.subscribe(params => {
        this.transformateurId = +params['id'] || 0;
          this.service.GetTransformateur(this.transformateurId);
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
        this.pv[0].zcmm2=this.getZcc2();
        this.pv[0].wccm2=this.getwccm2();
        this.pv[0].idC=this.ServiceS.Controleur.idC;
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

    getZcc2() {
      if (this.service.list[0].libelle === "Cuivre" && this.pv[0].temp !== undefined &&
          this.pv[0].na1 !== undefined && this.pv[0].nb2 !== undefined && this.pv[0].nc3 !== undefined &&
          this.pv[0].na0 !== undefined && this.pv[0].nb0 !== undefined && this.pv[0].nc0 !== undefined &&
          this.pv[0].wccm1 !== undefined) {

        const ibt = 1;
        const cc = (235 + 75) / (235 + this.pv[0].temp);
        const x6 = (235 + this.pv[0].temp) / (235 + this.pv[0].temp);
        const UAB = this.pv[0].na1;
        const UAC = this.pv[0].nb2;
        const UBC = this.pv[0].nc3;
        const Ua = this.pv[0].na0;
        const Ub = this.pv[0].nb0;
        const Uc = this.pv[0].nc0;

        const Po = this.pv[0].wom;
        const UccT0 = this.pv[0].uccm;
        const UccT0Pourcentage = this.getZccPourcentage();
        const PccTocc = this.pv[0].wccm1;

        const RABohmT0 = UAB / ibt;
        const RABohmT0cc = RABohmT0 * x6;
        const RABohm = RABohmT0 * cc;

        const RACohmT0 = UAC / ibt;
        const RACohmT0cc = RACohmT0 * x6;
        const RACohm = RACohmT0 * cc;

        const RBCohmT0 = UBC / ibt;
        const RBCohmT0cc = RBCohmT0 * x6;
        const RBCohm = RBCohmT0 * cc;

        const RaohmTo = Ua / ibt;
        const RaohmT0cc = RaohmTo * x6;
        const Raohm = RaohmT0cc * cc;

        const RbohmTo = Ub / ibt;
        const RbohmT0cc = RbohmTo * x6;
        const Rbohm = RbohmT0cc * cc;

        const RcohmTo = Uc / ibt;
        const RcohmT0cc = RcohmTo * x6;
        const Rcohm = RcohmT0cc * cc;

        const PjhTo = 1.5 * ((RABohmT0 + RACohmT0 + RBCohmT0) / 3) * this.service.list[0].mtu2 * this.service.list[0].mtu2;
        const PjhtT0cc = 1.5 * ((RABohmT0cc + RACohmT0cc + RBCohmT0cc) / 3) * this.service.list[0].mtu2 * this.service.list[0].mtu2;
        const PjbTo = (RaohmTo + RbohmTo + RcohmTo) * this.service.list[0].bti2 * this.service.list[0].bti2;
        const PjbT0cc = (RaohmT0cc + RbohmT0cc + RcohmT0cc) * this.service.list[0].bti2 * this.service.list[0].bti2;
        const PaddTo = PccTocc - (PjhtT0cc + PjbT0cc);
        const Pjht = PjhTo * cc;
        const Pjbt = PjbTo * cc;
        const Padd = PaddTo / cc;

        const power: number = parseInt(this.service.list[0].power, 10);
        const UrT0 = PccTocc / (power * 10);
        const Ux = Math.sqrt((UccT0Pourcentage * UccT0Pourcentage) - (UrT0 * UrT0));
        const wccm2 = this.getwccm2();
        const Ur = wccm2 / (power * 10);
        console.log(`
        UAB: ${UAB}, UAC: ${UAC}, UBC: ${UBC},
        Ua: ${Ua}, Ub: ${Ub}, Uc: ${Uc},
        Po: ${Po}, UccT0: ${UccT0}, UccT0Pourcentage: ${UccT0Pourcentage}, PccTocc: ${PccTocc},
        RABohmT0: ${RABohmT0}, RABohmT0cc: ${RABohmT0cc}, RABohm: ${RABohm},
        RACohmT0: ${RACohmT0}, RACohmT0cc: ${RACohmT0cc}, RACohm: ${RACohm},
        RBCohmT0: ${RBCohmT0}, RBCohmT0cc: ${RBCohmT0cc}, RBCohm: ${RBCohm},
        RaohmTo: ${RaohmTo}, RaohmT0cc: ${RaohmT0cc}, Raohm: ${Raohm},
        RbohmTo: ${RbohmTo}, RbohmT0cc: ${RbohmT0cc}, Rbohm: ${Rbohm},
        RcohmTo: ${RcohmTo}, RcohmT0cc: ${RcohmT0cc}, Rcohm: ${Rcohm},
        PjhTo: ${PjhTo}, PjhtT0cc: ${PjhtT0cc}, PjbTo: ${PjbTo},
        PjbT0cc: ${PjbT0cc}, PaddTo: ${PaddTo}, Pjht: ${Pjht},
        Pjbt: ${Pjbt}, Padd: ${Padd},
        power: ${power}, UrT0: ${UrT0}, Ux: ${Ux}, wccm2: ${wccm2},
        Ur: ${Ur}
      `);
        return  Math.sqrt((Ur * Ur) + (Ux * Ux));
      }
      else return 0 ;
    }
    getwccm2()
    {
      if (this.service.list[0].libelle === "Cuivre" && this.pv[0].temp !== undefined &&
          this.pv[0].na1 !== undefined && this.pv[0].nb2 !== undefined && this.pv[0].nc3 !== undefined &&
          this.pv[0].na0 !== undefined && this.pv[0].nb0 !== undefined && this.pv[0].nc0 !== undefined &&
          this.pv[0].wccm1 !== undefined) {

        const ibt = 1;
        const cc = (235 + 75) / (235 + this.pv[0].temp);
        const x6 = (235 + this.pv[0].temp) / (235 + this.pv[0].temp);
        const UAB = this.pv[0].na1;
        const UAC = this.pv[0].nb2;
        const UBC = this.pv[0].nc3;
        const Ua = this.pv[0].na0;
        const Ub = this.pv[0].nb0;
        const Uc = this.pv[0].nc0;

        const Po = this.pv[0].wom;
        const UccT0 = this.pv[0].uccm;
        const UccT0Pourcentage = this.getZccPourcentage();
        const PccTocc = this.pv[0].wccm1;

        const RABohmT0 = UAB / ibt;
        const RABohmT0cc = RABohmT0 * x6;
        const RABohm = RABohmT0 * cc;

        const RACohmT0 = UAC / ibt;
        const RACohmT0cc = RACohmT0 * x6;
        const RACohm = RACohmT0 * cc;

        const RBCohmT0 = UBC / ibt;
        const RBCohmT0cc = RBCohmT0 * x6;
        const RBCohm = RBCohmT0 * cc;

        const RaohmTo = Ua / ibt;
        const RaohmT0cc = RaohmTo * x6;
        const Raohm = RaohmT0cc * cc;

        const RbohmTo = Ub / ibt;
        const RbohmT0cc = RbohmTo * x6;
        const Rbohm = RbohmT0cc * cc;

        const RcohmTo = Uc / ibt;
        const RcohmT0cc = RcohmTo * x6;
        const Rcohm = RcohmT0cc * cc;

        const PjhTo = 1.5 * ((RABohmT0 + RACohmT0 + RBCohmT0) / 3) * this.service.list[0].mtu2 * this.service.list[0].mtu2;
        const PjhtT0cc = 1.5 * ((RABohmT0cc + RACohmT0cc + RBCohmT0cc) / 3) * this.service.list[0].mtu2 * this.service.list[0].mtu2;
        const PjbTo = (RaohmTo + RbohmTo + RcohmTo) * this.service.list[0].bti2 * this.service.list[0].bti2;
        const PjbT0cc = (RaohmT0cc + RbohmT0cc + RcohmT0cc) * this.service.list[0].bti2 * this.service.list[0].bti2;
        const PaddTo = PccTocc - (PjhtT0cc + PjbT0cc);
        const Pjht = PjhTo * cc;
        const Pjbt = PjbTo * cc;
        const Padd = PaddTo / cc;
        return Pjht+Pjbt+Padd;
    }
    else return 0;
  }
  }
