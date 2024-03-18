  import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
  import { Pv } from '../Shared/Pv-service.model';
  import { PvServiceService } from '../Shared/Pv-service.service';
  import { SessionService } from '../utils/session-service.service';
  import { Event } from '../Shared/Event-service.model'
  import { EventServiceService } from '../Shared/Event-service.service'
  import { MessageService } from 'primeng/api';
  @Component({
    selector: 'app-Essai-component',
    templateUrl: './Essai-component.component.html',
    styleUrls: ['./Essai-component.component.css']
  })
  export class EssaiComponentComponent implements OnInit {

    currentDate: string = '';
    transformateurId: number = 0;
    sidebarVisible1: boolean = false;
    pv: Pv[] = [];
    items: any[] = [
      { label: 'Fiche de calcul', icon: 'pi pi-calculator', command: () => this.toggleDialogAndHoverEffect() },
      { label: 'Imprimer', icon: 'pi pi-print', command: () => this.onPrint() },
      { label: 'Resultat des Tests', icon: 'pi pi-question', command: () => this.showDialog() },
    ];




    constructor(
      private router: Router,
      private route: ActivatedRoute,
      public service: TransformateurServiceService,
      public pvService: PvServiceService,
      public ServiceS : SessionService,
      public eventService : EventServiceService,
      public ServiceM : MessageService,
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
            this.getZcc2()
          },
          error => {
            console.error('Error fetching Pv data:', error);
          }
        );
      }
      );
    }
    isHoverDisabled: boolean = false;
    showDialog()
    {
      this.isHoverDisabled = true;
      this.sidebarVisible1 = !this.sidebarVisible1
    }

    visible4: boolean = false;

    showDialog2() {
      this.isHoverDisabled = true;
      setTimeout(() => {
        this.visible4 = true;
      }, 500); // Adjust the delay time in milliseconds according to your requirement
    }

    refreshPage() {
      window.location.reload();
    }
    savePvValues() {
      if (this.pv && this.pv.length > 0 && this.pv[0].id_pv !== undefined) {
        this.pv[0].zccm1=this.getZccPourcentage();
        this.pv[0].zcmm2=this.Zcc2;
        this.pv[0].wccm2=this.wcc2;
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
          if(this.ServiceS.Controleur.designation==="Verificateur")
          {
            const newEvent = new Event(this.ServiceS.Controleur.idC, "Verifier le Teste d'un transformateur", new Date(),"Essai Numero "+this.pv[0].id_pv+" de transformateur "+this.pv[0].id_t+ " est verifier par "+this.ServiceS.Controleur.username);
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
          }
          else
          {
            const newEvent = new Event(this.ServiceS.Controleur.idC, 'Tester un transformateur', new Date(),"Essai Numero "+this.pv[0].id_pv+" de transformateur "+this.pv[0].id_t+ " est tester par "+this.ServiceS.Controleur.username);
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
          }
            // Redirect the user to the specified page
            this.ServiceM.add({ severity: 'success', summary: 'Succès', detail: 'Les informations de Pv sont sauvegardées' });
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


    IA : number | undefined ;
    IB : number | undefined ;
    IC : number | undefined ;


    CalculateI0() {
      if (typeof this.IA !== 'undefined' && typeof this.IB !== 'undefined' && typeof this.IC !== 'undefined') {
          // Replace commas with periods and then convert strings to numbers before addition
          const sum = parseFloat(this.IA.toString().replace(',', '.')) + parseFloat(this.IB.toString().replace(',', '.')) + parseFloat(this.IC.toString().replace(',', '.'));

          // Calculate the average by dividing the sum by 3
          const average = sum / 3;

          // Limit the result to two decimal places
          this.pv[0].iom = parseFloat(average.toFixed(2));
      } else {
          // Handle the case where IA, IB, or IC is not defined
          console.error('IA, IB, or IC is not defined.');
      }
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
    iht: number = 0;
    cc: number = 0;
    cc2: number = 0;
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

    RAohmT0: number = 0;
    RAohm: number = 0;
    RBohmT0: number = 0;
    RBohm: number = 0;
    RCohmT0: number = 0;
    RCohm: number = 0;
    RaohmT0: number = 0;
    RbohmT0: number = 0;
    RcohmT0: number = 0;
    Zcc2: number = 0;
    wcc2: number = 0;
    PTOT: number = 0;
    getZcc2() {
      //Calculations for Cuivre (The one that got changed)
      if (this.service.list[0].libelle === "Aluminum" && this.pv[0].temp !== undefined &&
          this.pv[0].na1 !== undefined && this.pv[0].nb2 !== undefined && this.pv[0].nc3 !== undefined &&
          this.pv[0].na0 !== undefined && this.pv[0].nb0 !== undefined && this.pv[0].nc0 !== undefined &&
          this.pv[0].wccm1 !== undefined && this.service.list[0].type==="Triphasés") {
            this.ibt = 1;
            this.iht = 1;
            this.cc = (235 + 75) / (235 + this.pv[0].temp);
            this.cc2 = 310 / (this.pv[0].temp+235)

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

            this.RAohmT0 = this.UAB / this.iht;
            this.RAohm = this.RAohmT0 * this.cc2;

            this.RBohmT0 = this.UAC / this.iht;
            this.RBohm = this.RBohmT0 * this.cc2

            this.RCohmT0 = this.UBC / this.iht;
            this.RCohm = this.RCohmT0 * this.cc2;

            this.RaohmT0 = this.Ua / this.ibt;
            this.Raohm = this.RaohmT0 * this.cc2;

            this.RbohmT0 = this.Ub / this.ibt;
            this.Rbohm = this.RbohmT0 * this.cc2;

            this.RcohmT0 = this.Uc / this.ibt;
            this.Rcohm = this.RcohmT0 * this.cc2;

            this.PjhTo = 1.5 * ((this.RAohmT0 + this.RBohmT0 + this.RCohmT0) / 3) * this.service.list[0].mtu2 * this.service.list[0].mtu2;
            this.PjbTo = 1.5 * ((this.RaohmT0 + this.RbohmT0 + this.RcohmT0) / 3) * this.service.list[0].bti2 * this.service.list[0].bti2;

            this.PaddTo = this.PccTocc - (this.PjhTo+this.PjbTo) * (225+this.pv[0].temp)/(225+this.pv[0].temp)
            this.Pjht = this.PjhTo * this.cc2;
            this.Pjbt = this.PjbTo * this.cc2;
            this.Padd = this.PaddTo / this.cc;

            this.power = parseInt(this.service.list[0].power, 10);
            this.UrT0 = this.PccTocc / (this.power * 10);

            this.Ux = Math.sqrt((this.UccT0Pourcentage * this.UccT0Pourcentage) - (this.UrT0 * this.UrT0));
            this.wcc2 = this.Pjht+this.Pjbt+this.Padd;


            this.Ur = this.wcc2  / (this.power * 10);
            this.Po = this.pv[0]?.wom ?? 0; // Default value of 0 if this.pv[0].wom is undefined
            this.Zcc2 = Math.sqrt((this.Ur * this.Ur) + (this.Ux * this.Ux));
            this.PTOT = this.wcc2 + this.Po;
      }
      //Still waiting for the correct version
      else if (this.service.list[0].libelle === "Cuivre" && this.pv[0].temp !== undefined &&
      this.pv[0].na1 !== undefined && this.pv[0].nb2 !== undefined && this.pv[0].nc3 !== undefined &&
      this.pv[0].na0 !== undefined && this.pv[0].nb0 !== undefined && this.pv[0].nc0 !== undefined &&
      this.pv[0].wccm1 !== undefined && this.service.list[0].type==="Triphasés") {
        this.ibt = 1;
        this.iht = 1;
        this.cc = (235 + 75) / (235 + this.pv[0].temp);
        this.cc2 = 300 / (this.pv[0].temp+225)

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
        this.wcc2 = this.Pjht+this.Pjbt+this.Padd
        this.Ur = this.wcc2  / (this.power * 10);
        this.Po = this.pv[0]?.wom ?? 0; // Default value of 0 if this.pv[0].wom is undefined
        this.Zcc2 = Math.sqrt((this.Ur * this.Ur) + (this.Ux * this.Ux));
  }
      else {
        // Handle the case when data is not available or properties are undefined
        console.error('Invalid data or undefined properties in pv[0].');
    }
    }




  visible: boolean = false; // Variable to control the visibility of the dialog

  toggleDialogAndHoverEffect(): void {
    this.getZcc2();
    this.isHoverDisabled = true; // Disable hover effect
    setTimeout(() => {
        this.visible = true; // Show dialog after a short delay
    }, 300); // Adjust the delay as needed
}


Intervalle(x: number, y: number, V1: number, V2: number, V3: number) {
  console.log(`Checking Intervalle: x=${x}, y=${y}, V1=${V1}, V2=${V2}, V3=${V3}`);
  return V1 >= y && V1 <= x &&
         V2 >= y && V2 <= x &&
         V3 >= y && V3 <= x;
}

ValidateEssais() {
  // Check if all values are empty
  const allNullOrZero = (
    this.pv[0].vt11 === null || this.pv[0].vt11 === 0 ||
    this.pv[0].vt12 === null || this.pv[0].vt12 === 0 ||
    this.pv[0].vm11 === null || this.pv[0].vm11 === 0 ||
    this.pv[0].vm12 === null || this.pv[0].vm12 === 0 ||
    this.pv[0].vm13 === null || this.pv[0].vm13 === 0 ||
    this.pv[0].vt21 === null || this.pv[0].vt21 === 0 ||
    this.pv[0].vt22 === null || this.pv[0].vt22 === 0 ||
    this.pv[0].vm21 === null || this.pv[0].vm21 === 0 ||
    this.pv[0].vm22 === null || this.pv[0].vm22 === 0 ||
    this.pv[0].vm23 === null || this.pv[0].vm23 === 0 ||
    this.pv[0].vt31 === null || this.pv[0].vt31 === 0 ||
    this.pv[0].vt32 === null || this.pv[0].vt32 === 0 ||
    this.pv[0].vm31 === null || this.pv[0].vm31 === 0 ||
    this.pv[0].vm32 === null || this.pv[0].vm32 === 0 ||
    this.pv[0].vm33 === null || this.pv[0].vm33 === 0 ||
    this.pv[0].vt41 === null || this.pv[0].vt41 === 0 ||
    this.pv[0].vt42 === null || this.pv[0].vt42 === 0 ||
    this.pv[0].vm41 === null || this.pv[0].vm41 === 0 ||
    this.pv[0].vm42 === null || this.pv[0].vm42 === 0 ||
    this.pv[0].vm43 === null || this.pv[0].vm43 === 0 ||
    this.pv[0].vt51 === null || this.pv[0].vt51 === 0 ||
    this.pv[0].vt52 === null || this.pv[0].vt52 === 0 ||
    this.pv[0].vm51 === null || this.pv[0].vm51 === 0 ||
    this.pv[0].vm52 === null || this.pv[0].vm52 === 0 ||
    this.pv[0].vm53 === null || this.pv[0].vm53 === 0
  );


  if (allNullOrZero) {
    return "En Attente";
  } else {
    // Check if each interval is within range
    const conform = (
      this.Intervalle(this.pv[0].vt11 ?? 0, this.pv[0].vt12 ?? 0, this.pv[0].vm11 ?? 0, this.pv[0].vm12 ?? 0, this.pv[0].vm13 ?? 0) &&
      this.Intervalle(this.pv[0].vt21 ?? 0, this.pv[0].vt22 ?? 0, this.pv[0].vm21 ?? 0, this.pv[0].vm22 ?? 0, this.pv[0].vm23 ?? 0) &&
      this.Intervalle(this.pv[0].vt31 ?? 0, this.pv[0].vt32 ?? 0, this.pv[0].vm31 ?? 0, this.pv[0].vm32 ?? 0, this.pv[0].vm33 ?? 0) &&
      this.Intervalle(this.pv[0].vt41 ?? 0, this.pv[0].vt42 ?? 0, this.pv[0].vm41 ?? 0, this.pv[0].vm42 ?? 0, this.pv[0].vm43 ?? 0) &&
      this.Intervalle(this.pv[0].vt51 ?? 0, this.pv[0].vt52 ?? 0, this.pv[0].vm51 ?? 0, this.pv[0].vm52 ?? 0, this.pv[0].vm53 ?? 0)
    );

    return conform ? "Conforme" : "Non Conforme";
  }
}


ValidateEssais2() {
  if (
    this.pv[0].na0 !== null &&
    this.pv[0].na1 !== null &&
    this.pv[0].nb0 !== null &&
    this.pv[0].nb2 !== null &&
    this.pv[0].nc0 !== null &&
    this.pv[0].nc3 !== null
  ) {
    return "Conforme";
  } else {
    return "En Attente";
  }
}


@ViewChild('input16') input16!: ElementRef<HTMLInputElement>;

focusInput16() {
    if (this.input16) {
        this.input16.nativeElement.focus();
    }
}


@ViewChild('input23') input23!: ElementRef<HTMLInputElement>;

focusInput23() {
    if (this.input23) {
        this.input23.nativeElement.focus();
    }
}

@ViewChild('input26') input26!: ElementRef<HTMLInputElement>;

focusInput26() {
    if (this.input26) {
        this.input26.nativeElement.focus();
    }
}


@ViewChild('input30') input30!: ElementRef<HTMLInputElement>;

focusInput30() {
    if (this.input30) {
        this.input30.nativeElement.focus();
    }
}

}
