// Add_Modify-Transformateur.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { PvServiceService } from '../Shared/Pv-service.service';
import { Pv } from '../Shared/Pv-service.model';
import { Router } from '@angular/router';
import { Event } from '../Shared/Event-service.model'
import { EventServiceService } from '../Shared/Event-service.service'
import { SessionService } from '../utils/session-service.service'
@Component({
  selector: 'app-Add_Modify-Transformateur',
  templateUrl: './Add_Modify-Transformateur.component.html',
  styleUrls: ['./Add_Modify-Transformateur.component.css']
})
export class Add_ModifyTransformateurComponent implements OnInit {
  transformateurId: number = 0;
  isEditMode: boolean = false;
  transformateur: any = {};
  pv: Pv[] = [];
  constructor(
    private route: ActivatedRoute,
    public service: TransformateurServiceService,
    public servicePv : PvServiceService,
    public router: Router,
    public SessionS : SessionService,
    public eventService : EventServiceService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;

      if (this.transformateurId) {
        this.service.GetTransformateur(this.transformateurId);
        this.servicePv.getPvByTransformerId(this.transformateurId).subscribe(
          (pvData: Pv[]) => {
            this.pv = pvData;
            console.log('Pv Data:', this.pv);
          },
          error => {
            console.error('Error fetching Pv data:', error);
          }
        );
        console.log('Transformateur Data:', this.service.list);
      }
    });
  }


  Intervalle(x: number, y: number, V1: number, V2: number, V3: number) {
    console.log(`Checking Intervalle: x=${x}, y=${y}, V1=${V1}, V2=${V2}, V3=${V3}`);
    return V1 >= y && V1 <= x &&
           V2 >= y && V2 <= x &&
           V3 >= y && V3 <= x;
  }


  ValidateEssais() {
    return (
      this.Intervalle(
        this.pv[0].vt11 ?? 0,
        this.pv[0].vt12 ?? 0,
        this.pv[0].vm11 ?? 0,
        this.pv[0].vm12 ?? 0,
        this.pv[0].vm13 ?? 0
      ) &&
      this.Intervalle(
        this.pv[0].vt21 ?? 0,
        this.pv[0].vt22 ?? 0,
        this.pv[0].vm21 ?? 0,
        this.pv[0].vm22 ?? 0,
        this.pv[0].vm23 ?? 0
      ) &&
      this.Intervalle(
        this.pv[0].vt31 ?? 0,
        this.pv[0].vt32 ?? 0,
        this.pv[0].vm31 ?? 0,
        this.pv[0].vm32 ?? 0,
        this.pv[0].vm33 ?? 0
      ) &&
      this.Intervalle(
        this.pv[0].vt41 ?? 0,
        this.pv[0].vt42 ?? 0,
        this.pv[0].vm41 ?? 0,
        this.pv[0].vm42 ?? 0,
        this.pv[0].vm43 ?? 0
      ) &&
      this.Intervalle(
        this.pv[0].vt51 ?? 0,
        this.pv[0].vt52 ?? 0,
        this.pv[0].vm51 ?? 0,
        this.pv[0].vm52 ?? 0,
        this.pv[0].vm53 ?? 0
      )
    );
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
      return true;
    } else {
      return false;
    }
  }




  changeImage() {
    document.getElementById('fileInput')?.click();
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const userImage = document.getElementById('userImage') as HTMLImageElement;
        userImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  updateTransformateur() {

        this.transformateur = {
      marque: this.service.list[0].marque,
      numero: this.service.list[0].numero,
      client: this.service.list[0].client,
      norme: this.service.list[0].norme,
      type: this.service.list[0].type,
      mtu1: this.service.list[0].mtu1,
      mtu2: this.getI1(),
      btu2: this.service.list[0].btu2,
      bti2: this.getI2(),
      power: this.service.list[0].power,
      nbphase: this.service.list[0].nbphase,
      prises: this.service.list[0].prises,
      couplage: this.service.list[0].couplage,
      cooling: this.service.list[0].cooling,
      frequency: this.service.list[0].frequency,
      libelle : this.service.list[0].libelle,
      // Add other properties as needed...
    };
    this.pv[0].vt11 = this.getintervalle(0.95, 1.005),
    this.pv[0].vt12 = this.getintervalle(0.95, 0.995),
    this.pv[0].vt21 = this.getintervalle(0.975, 1.005),
    this.pv[0].vt22 = this.getintervalle(0.975, 0.995),
    this.pv[0].vt31 = this.getP3(1.005),
    this.pv[0].vt32 = this.getP3(0.995),
    this.pv[0].vt41 = this.getintervalle(1.025, 1.005),
    this.pv[0].vt42 = this.getintervalle(1.025, 0.995),
    this.pv[0].vt51 = this.getintervalle(1.05, 1.005),
    this.pv[0].vt52 = this.getintervalle(1.05, 0.995),
    this.service.UpdateTransformateur(this.transformateurId, this.transformateur)
      .subscribe({
        next: (res => {
          console.log('Transformateur updated successfully', res);
          // Creating and adding the event

          const newEvent = new Event(this.SessionS.Controleur.idC, 'Modifier un transformateur', new Date(),"type " + this.transformateur.type + " avec le numéro " + this.transformateur.numero+".");
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

          this.isEditMode = false;
          this.router.navigate(['/Transformateur']);
        })
      });
      if (this.pv[0].id_pv !== undefined) {
        this.servicePv.UpdatePv(this.pv[0].id_pv, this.pv[0])
          .subscribe({
            next: (res => {
              console.log('Pv updated successfully', res);
              // Other logic after successful update
            }),
            error: (error => {
              console.error('Error updating Pv', error);
            })
          });
      } else {
        console.error('Cannot update Pv - id_pv is undefined');
      }
  }
  getP3(MultiplyFactor: number): number {
    let result: number = 0;

    if (this.service.list[0].couplage.toUpperCase() === "MONO") {
      result = (this.service.list[0].mtu1 / this.service.list[0].btu2) * 1000;
    } else if (this.service.list[0].couplage.toUpperCase() === "YNYN") {
      result = (this.service.list[0].mtu1 / this.service.list[0].btu2) * 1000;
    } else if (this.service.list[0].couplage.toUpperCase() === "DYN") {
      result =( ( this.service.list[0].mtu1 / this.service.list[0].btu2) * 1000 )* Math.sqrt(3);
    } else {
      result = ( ( (this.service.list[0].mtu1 /this.service.list[0].btu2) * 1000 )* Math.sqrt(3) )/ 2;
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
  }

