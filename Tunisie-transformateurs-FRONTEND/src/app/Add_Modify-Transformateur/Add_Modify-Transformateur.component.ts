// Add_Modify-Transformateur.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { PvServiceService } from '../Shared/Pv-service.service';
import { Pv } from '../Shared/Pv-service.model';
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
    public servicePv : PvServiceService
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
      mtu1: this.service.list[0].mtu1,
      mtu2: this.service.list[0].mtu2,
      btu2: this.service.list[0].btu2,
      bti2: this.service.list[0].bti2,
      power: this.service.list[0].power,
      nbphase: this.service.list[0].nbphase,
      prises: this.service.list[0].prises,
      couplage: this.service.list[0].couplage,
      cooling: this.service.list[0].cooling,
      frequency: this.service.list[0].frequency,
      // Add other properties as needed...
    };
    this.service.UpdateTransformateur(this.transformateurId, this.transformateur)
      .subscribe({
        next: (res => {
          console.log('Transformateur updated successfully', res);
          this.isEditMode = false;
        })
      });
  }
  }

