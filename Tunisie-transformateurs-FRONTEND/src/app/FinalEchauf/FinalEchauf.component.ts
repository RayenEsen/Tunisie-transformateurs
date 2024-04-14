import { Component, OnInit } from '@angular/core';
import { EchafementBTServiceService } from '../Shared/EchaufementBT-service.service';
import { EchauffementBT } from '../Shared/EchaufementBT-service.model';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../utils/session-service.service';
import { MessageService } from 'primeng/api';
import { Liquide } from '../Shared/liquide-service.model';
import { LiquideServiceService } from '../Shared/liquide-service.service';

@Component({
  selector: 'app-FinalEchauf',
  templateUrl: './FinalEchauf.component.html',
  styleUrls: ['./FinalEchauf.component.css']
})
export class FinalEchaufComponent implements OnInit {

  items: any[] = [
    { label: 'R2(BT)', icon: 'pi pi-calculator', command: () => this.R2BT() }, // Wrench icon
    { label: 'R2(MT)', icon: 'pi pi-calculator', command: () => this.R2MT() }, // Tool icon
    { label: 'Echauffment du liquide', icon: 'pi pi-calculator', command: () => this.ligquid() } // Settings icon
  ];

  activeItem: any = this.items[0]; // Set activeItem to the first item in the items array

  data: any = {
    labels: [],
    datasets: [
      {
        label: 'R2(BT)/Temps (s)',
        data: [],
        fill: false,
        borderColor: 'grey'
      }
    ]
  };
  data2: any = {
    labels: [],
    datasets: [
      {
        label: 'R2(MT)/Temps (s)',
        data: [],
        fill: false,
        borderColor: 'grey'
      }
    ]
  };

  data3: any = {
    labels: [],
    datasets: [
      {
        label: 'Echauffement du liquide',
        data: [],
        fill: false,
        borderColor: 'grey'
      }
    ]
  };

  echaufementsBT : EchauffementBT[] = []
  echaufementsMT : EchauffementBT[] = []
  liquide : Liquide[] = []
  transformateurId!: number ;

  constructor(public ServiceL : LiquideServiceService,public  ServiceM : MessageService,public ServiceS : SessionService,public ServiceEchauf : EchafementBTServiceService, public router: ActivatedRoute,public service : TransformateurServiceService) { }

  y1: number[] = [];
  x1:number[] = [];


  y2: number[] = [];
  x2:number[] = [];

  y3: number[] = [];
  x3: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];


  ngOnInit() {
    this.router.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.service.GetTransformateur(this.transformateurId);
    });

    this.ServiceEchauf.checkOrCreateEchauffement(this.transformateurId, "BT").subscribe({
      next: (response) => {
        this.echaufementsBT = response;

        // Extract temp values from echaufementsBT starting from the second element and push them into the y1 array
        this.echaufementsBT.forEach((ech) => {
          this.y1.push(ech.temp);
          this.x1.push(ech.resultat);
        });


        // Replace the numbers in data with the values from the y array
        this.data.datasets[0].data = this.x1; // Change this.y to this.x

        // Replace the labels with the values from x array
        this.data.labels = this.y1;
      }
    });



    this.ServiceEchauf.checkOrCreateEchauffement(this.transformateurId, "MT").subscribe({
      next: (response) => {
        this.echaufementsMT = response;

        // Extract temp values from echaufementsBT and push them into the y array
        this.echaufementsMT.forEach((ech) => {
          this.y2.push(ech.temp);
          this.x2.push(ech.resultat);
        });

        // Update data2 with new values
        this.data2.datasets[0].data = this.x2;
        this.data2.labels = this.y2;
      }
    });

    this.ServiceL.getLiquidesByTransformateur(this.transformateurId).subscribe({
      next : (Response) =>
        {
          this.liquide = Response;

        this.liquide.forEach((ech) => {
          this.y3.push(ech.resultat);
        });

        this.data3.datasets[0].data = this.x3;
        this.data3.labels = this.y3;
        }
    })
  }

    Visible1 = true;
    Visible2 = false;
    Visible3 = false;


    R2BT()
    {
      this.Visible1 = true;
      this.Visible2 = false;
      this.Visible3 = false;
    }


    R2MT() {
      this.Visible1 = false;
      this.Visible2 = true;
      this.Visible3 = false;
    }

    ligquid()
    {
      this.Visible1 = false;
      this.Visible2 = false;
      this.Visible3 = true;
    }



    // Method to handle tab change event
    onTabChange(event: any) {
      this.activeItem = event.item; // Update the activeItem variable
    }

    update()
    {
      if(this.Visible1)
      {
        this.echaufementsBT[0].date = new Date;
        if (this.ServiceS.Controleur.designation === "Controleur") {
          if (this.echaufementsBT && this.echaufementsBT.length > 0) {
            this.echaufementsBT[0].controleur1 = this.ServiceS.Controleur.username || '';
          }
        }
        if (this.ServiceS.Controleur.designation === "Verificateur") {
          if (this.echaufementsBT && this.echaufementsBT.length > 0) {
            this.echaufementsBT[0].verificateur = this.ServiceS.Controleur.username || '';
          }
        }


      this.ServiceEchauf.updateEchauffement(this.echaufementsBT).subscribe({
        next: (response) => {
          this.ServiceM.add({ severity: 'success', summary: 'Success', detail: 'Les informations sont enregistrées' });
        },
        error: (error) => {
          console.error('Error:', error);
          // Handle error if needed
        }
      });
      }
      else if (this.Visible2)
      {
        console.log(this.Visible2)

        this.echaufementsMT[0].date = new Date;
        if (this.ServiceS.Controleur.designation === "Controleur") {
          if (this.echaufementsMT && this.echaufementsMT.length > 0) {
            this.echaufementsMT[0].controleur1 = this.ServiceS.Controleur.username || '';
          }
        }
        if (this.ServiceS.Controleur.designation === "Verificateur") {
          if (this.echaufementsMT && this.echaufementsMT.length > 0) {
            this.echaufementsMT[0].verificateur = this.ServiceS.Controleur.username || '';
          }
        }


      this.ServiceEchauf.updateEchauffement(this.echaufementsMT).subscribe({
        next: (response) => {
          this.ServiceM.add({ severity: 'success', summary: 'Success', detail: 'Les informations sont enregistrées' });
        },
        error: (error) => {
          console.error('Error:', error);
          // Handle error if needed
        }
      });
      }


      else if (this.Visible3)
        {
          console.log(this.Visible3)

          this.liquide[0].date = new Date;
          if (this.ServiceS.Controleur.designation === "Controleur") {
            if (this.liquide && this.liquide.length > 0) {
              this.liquide[0].controleur1 = this.ServiceS.Controleur.username || '';
            }
          }
          if (this.ServiceS.Controleur.designation === "Verificateur") {
            if (this.liquide && this.liquide.length > 0) {
              this.liquide[0].verificateur = this.ServiceS.Controleur.username || '';
            }
          }


        this.ServiceL.updateLiquides(this.liquide).subscribe({
          next: (response) => {
            this.ServiceM.add({ severity: 'success', summary: 'Success', detail: 'Les informations sont enregistrées' });
          },
          error: (error) => {
            console.error('Error:', error);
            // Handle error if needed
          }
        });
        }

    }

     G46 : number = 0;
     calculateTheta2(E46: number | undefined, D46: number | undefined, F46: number | undefined) {
      if (E46 !== undefined && D46 !== undefined && F46 !== undefined && D46 !== 0) {
          this.G46 = (E46 / D46) * (225 + F46) - 225
          return this.G46
      }
      return 0
    }

    ConclusionLiquide() {
      return (Math.round(this.liquide[16].resultat) <= Math.round(this.liquide[0].vl)) ? 'C' : 'NC';
    }

    CalculBT()
    {


          const G31 =  this.liquide[16].a0 -   this.liquide[17].a0
          const G21 = (( this.liquide[17].a1+this.liquide[0].a2+this.liquide[0].a3+this.liquide[0].a4) / 4)

          return Math.round(this.G46 + G31 - G21 );

    }

    ConclusionBT() {
      const C49 = this.CalculBT();
      const F49 = this.echaufementsBT[0].vl;

      const roundedC49 = Math.round(C49);
      const roundedF49 = Math.round(F49);

      return (roundedC49 <= roundedF49) ? 'C' : 'NC';
    }



    CalculMT()
    {

          const G31 =  this.liquide[16].a0 -   this.liquide[17].a0
          const G21 = (( this.liquide[17].a1+this.liquide[0].a2+this.liquide[0].a3+this.liquide[0].a4) / 4)

          return Math.round(this.G46 + G31 - G21 );

    }




}
