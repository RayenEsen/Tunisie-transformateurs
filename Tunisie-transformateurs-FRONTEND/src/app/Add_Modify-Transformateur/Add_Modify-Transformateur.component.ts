// Add_Modify-Transformateur.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';

@Component({
  selector: 'app-Add_Modify-Transformateur',
  templateUrl: './Add_Modify-Transformateur.component.html',
  styleUrls: ['./Add_Modify-Transformateur.component.css']
})
export class Add_ModifyTransformateurComponent implements OnInit {
  transformateurId: number = 0;
  isEditMode: boolean = false;
  transformateur: any = {};

  constructor(
    private route: ActivatedRoute,
    public service: TransformateurServiceService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;

      if (this.transformateurId) {
        this.service.GetTransformateur(this.transformateurId);
        console.log('Transformateur Data:', this.service.list);
      }
    });
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

