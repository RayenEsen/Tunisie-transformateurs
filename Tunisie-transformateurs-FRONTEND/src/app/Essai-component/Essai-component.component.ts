  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
  import { Pv } from '../Shared/Pv-service.model';
  import { PvServiceService } from '../Shared/Pv-service.service';
  import { SessionService } from '../utils/session-service.service';
  import { Event } from '../Shared/Event-service.model'
  import { EventServiceService } from '../Shared/Event-service.service'
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
      public ServiceS : SessionService,
      public eventService : EventServiceService

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
        console.log(this.ServiceS.Controleur)
        if(this.ServiceS.Controleur.designation==="Verificateur")
        {
          this.pv[0].technique=this.ServiceS.Controleur.username;
        }
        if(this.ServiceS.Controleur.designation==="Controleur")
        {
          this.pv[0].idC=this.ServiceS.Controleur.idC;
        }
        // Call a service method to update the Pv values on the server
        this.pvService.UpdatePv(this.pv[0].id_pv, this.pv[0]).subscribe(
          response => {
            console.log('Pv values updated successfully', response);
          // Creating and adding the event
          const newEvent = new Event(this.ServiceS.Controleur.idC, 'Tester un transformateur', new Date(),"Essai No "+this.pv[0].id_pv+" de transformateur "+this.pv[0].id_t);
          this.eventService.AddEvent(newEvent)
            .subscribe({
              next: (response) => {
                console.log('Event added successfully:', response);
                // Add any further logic here if needed
              },
              error: (error) => {
                console.error('Error adding event:', error);
                // Handle the error appropriately
              }
            });

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
      if(this.pv[0].iom)
      {
        return (this.pv[0].iom*100)/(this.service.list[0].bti2)
      }
      else return 0
    }
    getZccPourcentage()
    {
      if (this.pv[0].uccm !== undefined)
      {
        return (this.pv[0].uccm / (this.service.list[0].mtu1*10))
      }
      else return 0;
    }
    ibt: number = 0;
    cc: number = 0;
    x6: number = 0;
    UAB: number = 0;
    UAC: number = 0;
    UBC: number = 0;
    Ua: number = 0;
    Ub: number = 0;
    Uc: number = 0;

    Po: number = 0;
    UccT0: number = 0;
    UccT0Pourcentage: number = 0;
    PccTocc: number = 0;

    RABohmT0: number = 0;
    RABohmT0cc: number = 0;
    RABohm: number = 0;

    RACohmT0: number = 0;
    RACohmT0cc: number = 0;
    RACohm: number = 0;

    RBCohmT0: number = 0;
    RBCohmT0cc: number = 0;
    RBCohm: number = 0;

    RaohmTo: number = 0;
    RaohmT0cc: number = 0;
    Raohm: number = 0;

    RbohmTo: number = 0;
    RbohmT0cc: number = 0;
    Rbohm: number = 0;

    RcohmTo: number = 0;
    RcohmT0cc: number = 0;
    Rcohm: number = 0;

    PjhTo: number = 0;
    PjhtT0cc: number = 0;
    PjbTo: number = 0;
    PjbT0cc: number = 0;
    PaddTo: number = 0;
    Pjht: number = 0;
    Pjbt: number = 0;
    Padd: number = 0;

    power: number = 0;
    UrT0: number = 0;
    Ux: number = 0;
    wccm2: number = 0;
    Ur: number = 0;

    getZcc2() {
      if (this.service.list[0].libelle === "Cuivre" && this.pv[0].temp !== undefined &&
          this.pv[0].na1 !== undefined && this.pv[0].nb2 !== undefined && this.pv[0].nc3 !== undefined &&
          this.pv[0].na0 !== undefined && this.pv[0].nb0 !== undefined && this.pv[0].nc0 !== undefined &&
          this.pv[0].wccm1 !== undefined) {
            this.ibt = 1;
            this.cc = (235 + 75) / (235 + this.pv[0].temp);
            this.x6 = (235 + this.pv[0].temp) / (235 + this.pv[0].temp);
            this.UAB = this.pv[0].na1;
            this.UAC = this.pv[0].nb2;
            this.UBC = this.pv[0].nc3;
            this.Ua = this.pv[0].na0;
            this.Ub = this.pv[0].nb0;
            this.Uc = this.pv[0].nc0;
            if (this.pv && this.pv[0] && typeof this.pv[0].uccm === 'number') {
              this.UccT0 = this.pv[0].uccm;
          }
            this.UccT0Pourcentage = this.getZccPourcentage();
            this.PccTocc = this.pv[0].wccm1;

            this.RABohmT0 = this.UAB / this.ibt;
            this.RABohmT0cc = this.RABohmT0 * this.x6;
            this.RABohm = this.RABohmT0 * this.cc;

            this.RACohmT0 = this.UAC / this.ibt;
            this.RACohmT0cc = this.RACohmT0 * this.x6;
            this.RACohm = this.RACohmT0 * this.cc;

            this.RBCohmT0 = this.UBC / this.ibt;
            this.RBCohmT0cc = this.RBCohmT0 * this.x6;
            this.RBCohm = this.RBCohmT0 * this.cc;

            this.RaohmTo = this.Ua / this.ibt;
            this.RaohmT0cc = this.RaohmTo * this.x6;
            this.Raohm = this.RaohmT0cc * this.cc;

            this.RbohmTo = this.Ub / this.ibt;
            this.RbohmT0cc = this.RbohmTo * this.x6;
            this.Rbohm = this.RbohmT0cc * this.cc;

            this.RcohmTo = this.Uc / this.ibt;
            this.RcohmT0cc = this.RcohmTo * this.x6;
            this.Rcohm = this.RcohmT0cc * this.cc;

            this.PjhTo = 1.5 * ((this.RABohmT0 + this.RACohmT0 + this.RBCohmT0) / 3) * this.service.list[0].mtu2 * this.service.list[0].mtu2;
            this.PjhtT0cc = 1.5 * ((this.RABohmT0cc + this.RACohmT0cc + this.RBCohmT0cc) / 3) * this.service.list[0].mtu2 * this.service.list[0].mtu2;
            this.PjbTo = (this.RaohmTo + this.RbohmTo + this.RcohmTo) * this.service.list[0].bti2 * this.service.list[0].bti2;
            this.PjbT0cc = (this.RaohmT0cc + this.RbohmT0cc + this.RcohmT0cc) * this.service.list[0].bti2 * this.service.list[0].bti2;
            this.PaddTo = this.PccTocc - (this.PjhtT0cc + this.PjbT0cc);
            this.Pjht = this.PjhTo * this.cc;
            this.Pjbt = this.PjbTo * this.cc;
            this.Padd = this.PaddTo / this.cc;

            this.power = parseInt(this.service.list[0].power, 10);
            this.UrT0 = this.PccTocc / (this.power * 10);
            this.Ux = Math.sqrt((this.UccT0Pourcentage * this.UccT0Pourcentage) - (this.UrT0 * this.UrT0));
            this.wccm2 = this.getwccm2();
            this.Ur = this.wccm2 / (this.power * 10);

        return  Math.sqrt((this.Ur * this.Ur) + (this.Ux * this.Ux));
      }
      else return 0 ;
    }
    getwccm2()
    {
      if (this.service.list[0].libelle === "Cuivre" && this.pv[0].temp !== undefined &&
          this.pv[0].na1 !== undefined && this.pv[0].nb2 !== undefined && this.pv[0].nc3 !== undefined &&
          this.pv[0].na0 !== undefined && this.pv[0].nb0 !== undefined && this.pv[0].nc0 !== undefined &&
          this.pv[0].wccm1 !== undefined) {

            this.ibt = 1;
            this.cc = (235 + 75) / (235 + this.pv[0].temp);
            this.x6 = (235 + this.pv[0].temp) / (235 + this.pv[0].temp);
            // Assuming these variables are defined within a method of an object

            this.UAB = this.pv[0].na1;
            this.UAC = this.pv[0].nb2;
            this.UBC = this.pv[0].nc3;
            this.Ua = this.pv[0].na0;
            this.Ub = this.pv[0].nb0;
            this.Uc = this.pv[0].nc0;

            if (this.pv[0].wom !== undefined && this.pv[0].uccm !== undefined) {
              this.Po = this.pv[0].wom;
              this.UccT0 = this.pv[0].uccm;
          } else {
              // Handle the case where one or both of the properties are undefined
              // You can assign default values or handle the error as needed
          }

            this.UccT0Pourcentage = this.getZccPourcentage();
            this.PccTocc = this.pv[0].wccm1;

            this.RABohmT0 = this.UAB / this.ibt;
            this.RABohmT0cc = this.RABohmT0 * this.x6;
            this.RABohm = this.RABohmT0 * this.cc;

            this.RACohmT0 = this.UAC / this.ibt;
            this.RACohmT0cc = this.RACohmT0 * this.x6;
            this.RACohm = this.RACohmT0 * this.cc;

            this.RBCohmT0 = this.UBC / this.ibt;
            this.RBCohmT0cc = this.RBCohmT0 * this.x6;
            this.RBCohm = this.RBCohmT0 * this.cc;

            this.RaohmTo = this.Ua / this.ibt;
            this.RaohmT0cc = this.RaohmTo * this.x6;
            this.Raohm = this.RaohmT0cc * this.cc;

            this.RbohmTo = this.Ub / this.ibt;
            this.RbohmT0cc = this.RbohmTo * this.x6;
            this.Rbohm = this.RbohmT0cc * this.cc;

            this.RcohmTo = this.Uc / this.ibt;
            this.RcohmT0cc = this.RcohmTo * this.x6;
            this.Rcohm = this.RcohmT0cc * this.cc;

            this.PjhTo = 1.5 * ((this.RABohmT0 + this.RACohmT0 + this.RBCohmT0) / 3) * this.service.list[0].mtu2 * this.service.list[0].mtu2;
            this.PjhtT0cc = 1.5 * ((this.RABohmT0cc + this.RACohmT0cc + this.RBCohmT0cc) / 3) * this.service.list[0].mtu2 * this.service.list[0].mtu2;
            this.PjbTo = (this.RaohmTo + this.RbohmTo + this.RcohmTo) * this.service.list[0].bti2 * this.service.list[0].bti2;
            this.PjbT0cc = (this.RaohmT0cc + this.RbohmT0cc + this.RcohmT0cc) * this.service.list[0].bti2 * this.service.list[0].bti2;
            this.PaddTo = this.PccTocc - (this.PjhtT0cc + this.PjbT0cc);
            this.Pjht = this.PjhTo * this.cc;
            this.Pjbt = this.PjbTo * this.cc;
            this.Padd = this.PaddTo / this.cc;

        return this.Pjht+this.Pjbt+this.Padd;
    }
    else return 0;
  }
  visible: boolean = false; // Variable to control the visibility of the dialog
  isHoverDisabled: boolean = false;

  toggleDialogAndHoverEffect(): void {
    this.visible = true; // Show dialog
    this.isHoverDisabled = true; // Disable hover effect
  }

  }
