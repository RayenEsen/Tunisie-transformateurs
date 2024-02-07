import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { SessionService } from '../utils/session-service.service';
import { Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Bobinage } from '../Shared/Bobinage-service.model';
import { BobinageServiceService } from '../Shared/Bobinage-service.service';
import { BobinageMTServiceService } from '../Shared/BobinageMT-service.service';
import { BobinageMT } from '../Shared/BobinageMT-service.model';
import { MagnetiqueServiceService } from '../Shared/Magnetique-service.service';
import { Magnetique } from '../Shared/Magnetique-service.model';
import { MontageServiceService } from '../Shared/Montage-service.service';
import { Montage } from '../Shared/Montage-service.model';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';

@Component({
  selector: 'app-Controle-component',
  templateUrl: './Controle-component.component.html',
  styleUrls: ['./Controle-component.component.css']
})
export class ControleComponentComponent implements OnInit {

  transformateurId: number = 0;

  etapes: Etape[] = []; // Array to store fetched Etapes
  bobinages: Bobinage[] = []; // Array to store fetched Etapes
  bobinagesMT: BobinageMT[] = []; // Array to store fetched Etapes
  Magnetiques: Magnetique[] = []; // Array to store fetched Etapes
  Montages: Montage[] = []; // Array to store fetched Etapes
  users: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public serviceE: EtapeServiceService,
    public ServiceS: SessionService,
    private router: Router, // Add this line to inject the Router
    public Service : TransformateurServiceService,
    public ServiceBT : BobinageServiceService,
    public ServiceMT : BobinageMTServiceService,
    public ServiceMag : MagnetiqueServiceService,
    public ServiceMon : MontageServiceService,
    public userService : ControlleurServiceService,
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
    this.ServiceBT.getBobinageByTransformateurId(this.transformateurId)
    .subscribe(
       bobinages => {
        console.log(bobinages);
        if (bobinages.every(b => b.bt1 !== null) && this.etapes[0].dateFin===null) {
          this.updateEtapeDateFin(1);
        }
        if (bobinages.every(b => b.bt2 !== null)&& this.etapes[1].dateFin===null) {
          this.updateEtapeDateFin(2);
        }
        if (bobinages.every(b => b.bt3 !== null)&& this.etapes[2].dateFin===null) {
          this.updateEtapeDateFin(3);
        }
      }
    )
    this.ServiceMT.getBobinageByTransformateurId(this.transformateurId)
    .subscribe(
       bobinagesMT => {
        console.log(BobinageMT);
        if (bobinagesMT.every(b => b.bt1 !== null) && this.etapes[3].dateFin===null) {
          this.updateEtapeDateFin(4);
        }
        if (bobinagesMT.every(b => b.bt2 !== null) && this.etapes[4].dateFin===null) {
          this.updateEtapeDateFin(5);
        }
        if (bobinagesMT.every(b => b.bt3 !== null) && this.etapes[5].dateFin===null) {
          this.updateEtapeDateFin(6);
        }
      }
    )
    this.ServiceMag.getMagnetiqueByTransformateurId(this.transformateurId)
    .subscribe(
      Magnetiques => {
        console.log(Magnetiques);

        const allConditionsMet = Magnetiques.every(item =>
          item.f1c1m !== null &&
          item.f1c1p !== null &&
          item.f2c2m !== null &&
          item.f2c2p !== null &&
          item.f3c3m !== null &&
          item.f3c3p !== null
        );

        if (allConditionsMet && this.etapes[6].dateFin === null && this.etapes[7].dateFin === null) {
          this.updateEtapeDateFin(7);
          this.updateEtapeDateFin(8);
        }
      }
    );

    this.ServiceMon.getMontageByTransformateurId(this.transformateurId)
    .subscribe(
      Montages => {
        console.log(Montages);

        const allConditionsMet = Montages.every(item =>
          item.c1m !== null &&
          item.c1p !== null &&
          item.c2m !== null &&
          item.c2p !== null &&
          item.c3m !== null &&
          item.c3p !== null
        );

        if (allConditionsMet && this.etapes[8].dateFin === null && this.etapes[9].dateFin === null && allConditionsMet && this.etapes[10].dateFin === null && allConditionsMet && this.etapes[11].dateFin === null) {
          this.updateEtapeDateFin(9);
          this.updateEtapeDateFin(10);
          this.updateEtapeDateFin(11);
          this.updateEtapeDateFin(12);

        }
      }
    );

  }


  updateEtapeDateFin(etapeNumero: number) {
    const selectedEtape = this.etapes.find(et => et.etapeNumero === etapeNumero);

    if (selectedEtape) {
        selectedEtape.dateFin = new Date();

        this.serviceE.UpdateEtape(this.transformateurId, etapeNumero, selectedEtape)
            .subscribe(
                () => {
                    console.log(`Etape ${etapeNumero} dateFin updated successfully`);
                },
                error => {
                    console.error(`Error updating Etape ${etapeNumero} dateFin`, error);
                }
            );
    } else {
        console.error(`Etape ${etapeNumero} not found`);
    }
}


  isReadOnly: boolean = true;

  toggleEditable() {
    this.isReadOnly = !this.isReadOnly;

    if (!this.isReadOnly) {
      this.userService.getUsersByRole('Operateur').subscribe((usernames: string[]) => {
        this.users = usernames;
        console.log(this.users)
      });
    } else {
      // Clear the users array when readonly to hide the autocomplete options
      this.users = [];
    }
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

    getRouterLink(etapeNumero: number): any[] {
      switch (etapeNumero) {
        case 1:
          return ['/Bobinage', this.transformateurId,etapeNumero];
        case 4:
          return ['/BobinageMT', this.transformateurId,etapeNumero];
        case 7:
            return ['/Magnetique', this.transformateurId,etapeNumero];
        case 9:
            return ['/Montage', this.transformateurId,etapeNumero];
        default:
          // Add default route or handle other cases as needed
          return ['/DefaultRoute'];
      }
    }


}




