import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { SessionService } from '../utils/session-service.service';
import { Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';

@Component({
  selector: 'app-Controle-component',
  templateUrl: './Controle-component.component.html',
  styleUrls: ['./Controle-component.component.css']
})
export class ControleComponentComponent implements OnInit {

  transformateurId: number = 0;
  etapes: Etape[] = []; // Array to store fetched Etapes

  constructor(
    private route: ActivatedRoute,
    public serviceE: EtapeServiceService,
    public ServiceS: SessionService,
    private router: Router, // Add this line to inject the Router
    public Service : TransformateurServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.Service.GetTransformateur(this.transformateurId);
      // Fetch Etapes by Transformateur id
      this.serviceE.getEtapesByTransformateurId(this.transformateurId)
        .subscribe(
          etapes => {
            console.log(etapes);
            this.etapes = etapes; // Store fetched Etapes in the array
          },
          error => {
            console.error('Error loading Etapes', error);
          }
        );
    });
  }

  isReadOnly: boolean = true;

  toggleEditable() {
    this.isReadOnly = !this.isReadOnly;
  }

  updateEtape(etapeNumero: number) {
    const selectedEtape = this.etapes.find(et => et.etapeNumero === etapeNumero);
    selectedEtape!.dateDebut = new Date();
    if (selectedEtape) {
      console.log(selectedEtape)
          this.serviceE.UpdateEtape(this.transformateurId, etapeNumero, selectedEtape)
            .subscribe(
              () => {
                console.log('Etape updated successfully');
                this.isReadOnly = true;
              },
              error => {
                console.error('Error updating Etape', error);
              }
            );
        }
    }


    getOrderValue(numeroETAPE: number): number {
      // Add your logic here to determine the order based on numeroETAPE
      // For example, return different order values for different Etape numbers
      if (numeroETAPE === 1) {
        return 1;
      } else if (numeroETAPE === 3) {
        return 2;
      } else if (numeroETAPE === 6) {
        return 3;
      } else if (numeroETAPE === 8) {
        return 4;
      } else if (numeroETAPE === 12) {
        return 5;
      } else if (numeroETAPE === 14) {
        return 6;
      } else {
        return 7; // Default order for other cases
      }
    }
    showCard(etapeNumero: number): boolean {
      // Add your logic here to determine whether to show the card based on etapeNumero
      return [1, 4, 7, 9, 13, 15, 17].includes(etapeNumero);
    }

    getCardTitle(etapeNumero: number): string {
      switch (etapeNumero) {
        case 1:
          return 'Bobinage BT';
        case 4:
          return 'Bobinage MT';
        case 7:
          return 'Controle dimensionnelle circuit magnetique';
        case 9:
          return 'Montage';
        default:
          return 'Default Title';
      }
    }

}




