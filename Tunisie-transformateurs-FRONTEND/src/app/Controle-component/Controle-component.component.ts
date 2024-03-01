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

import { Message, MessageService } from 'primeng/api';
import { Ecuvage } from '../Shared/Ecuvage-service.model';
import { EcuvageServiceService } from '../Shared/Ecuvage-service.service';
import { RemplissageServiceService } from '../Shared/Remplissage-service.service';
import { Remplissage } from '../Shared/Remplissage-service.model';
import { PeintureServiceService } from '../Shared/Peinture-service.service';
import { Peinture } from '../Shared/Peinture-service.model';
import { ConseptionServiceService } from '../Shared/Conseption-service.service';
import { Conseption } from '../Shared/Conseption-service.model';
import { OperateurSuggestions } from '../Shared/OperateurSuggestions-service.model';
import { OperateurSuggestionsServiceService } from '../Shared/OperateurSuggestions-service.service';
@Component({
  selector: 'app-Controle-component',
  templateUrl: './Controle-component.component.html',
  styleUrls: ['./Controle-component.component.css'],

})
export class ControleComponentComponent implements OnInit {
  selectedItemsMap: { [key: string]: any[] } = {}; // Map to store selected items for each etape

  transformateurId: number = 0;
  etapes: Etape[] = []; // Array to store fetched Etapes
  bobinages: Bobinage[] = []; // Array to store fetched Etapes
  bobinagesMT: BobinageMT[] = []; // Array to store fetched Etapes
  Magnetiques: Magnetique[] = []; // Array to store fetched Etapes
  Montages: Montage[] = []; // Array to store fetched Etapes
  operateurIndexes: number[][] = [];
  operateurSuggestion : OperateurSuggestions = new OperateurSuggestions;
  suggestions: string[] = [];
  filteredSuggestions : string[] = []
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
    public MessageService : MessageService,
    public EcuvageService : EcuvageServiceService,
    public RemplissageService : RemplissageServiceService,
    public PeintureService : PeintureServiceService,
    public ConseptionService : ConseptionServiceService,
    public OperateurService : OperateurSuggestionsServiceService,
  ) {}


  ngOnInit() {
    this.OperateurService.GetAllSuggestions().subscribe({
      next: (response: any[]) => {
        this.suggestions=response;
      }
    });
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.Service.GetTransformateur(this.transformateurId);
      // Fetch Etapes by Transformateur id
      this.serviceE.getEtapesByTransformateurId(this.transformateurId)
          .subscribe(
              etapes => {
                  console.log(etapes);
                  this.etapes = etapes; // Assign etapes directly without filtering
                  this.initializeSelectedItemsMap();

                  // Move the code dependent on this.etapes inside this subscription callback
                  this.fetchAndUpdateBobinages();
                  this.fetchAndUpdateBobinagesMT();
                  this.fetchAndUpdateMagnetiques();
                  this.fetchAndUpdateMontages();
                  this.fetchAndUpdateEncuvage();
                  this.fetchAndUpdateRemplissage();
                  this.fetchAndUpdatePeinture();
                  this.fetchAndUpdateConseption();
                  this.END_OF_PRODUCTION();
              },
              error => {
                  console.error('Error loading Etapes', error);
              }
          );
    });

  }
  initializeSelectedItemsMap(): void {
    this.etapes.forEach(etape => {
      const selectedItems: any[] = [];
      if (etape.operateur1) {
        selectedItems.push(etape.operateur1);
      }
      if (etape.operateur2) {
        selectedItems.push(etape.operateur2);
      }
      this.selectedItemsMap[etape.etapeNumero] = selectedItems;
    });
  }
  search(event: any) {
    this.OperateurService.GetAllSuggestions().subscribe({
      next: (response: any[]) => {
        this.suggestions=response;
      }
    });
    let filtered: string[] = [];
    let query = event.query.toLowerCase(); // Convert query to lower case once

    for (let i = 0; i < this.suggestions.length; i++) {
      let suggestion = this.suggestions[i];
      if (typeof suggestion === 'string') { // Check if suggestion is a string
        if (suggestion.toLowerCase().indexOf(query) === 0) {
          filtered.push(suggestion);
        }
      } else {
        console.warn(`Invalid suggestion at index ${i}:`, suggestion);
      }
    }

    this.filteredSuggestions = filtered;
  }

  verif(etape: Etape) {
    console.log('etape:', etape); // Log the contents of the etape object
    if (etape.operateur1 || etape.operateur2) {
      // The etape object has both operateur1 and operateur2 defined
      this.router.navigate(this.getRouterLink(etape.etapeNumero));
    } else {
      // The etape object does not have both operateur1 and operateur2 defined
      this.MessageService.add({ severity: 'error', summary: 'Erreur', detail: 'Opérateur est requis pour continuer.' });
    }
  }




  fetchAndUpdateBobinages() {
    this.ServiceBT.getBobinageByTransformateurId(this.transformateurId)
      .subscribe(
        bobinages => {
          console.log(bobinages);
          // Check if filteredEtapes[0] is defined before accessing its properties
          if (bobinages.every(b => b.bt1 !== null) && this.etapes[0] && this.etapes[0].dateFin === null) {
            this.updateEtapeDateFin(1);
          }
          if (bobinages.every(b => b.bt2 !== null) && this.etapes[1] && this.etapes[1].dateFin === null) {
            this.updateEtapeDateFin(2);
          }
          if (bobinages.every(b => b.bt3 !== null) && this.etapes[2] && this.etapes[2].dateFin === null) {
            this.updateEtapeDateFin(3);
          }
        }
      );
  }

  fetchAndUpdateBobinagesMT() {
    this.ServiceMT.getBobinageByTransformateurId(this.transformateurId)
      .subscribe(
        bobinagesMT => {
          console.log(bobinagesMT);
          // Check if filteredEtapes[3] is defined before accessing its properties
          if (bobinagesMT.every(b => b.bt1 !== null) && this.etapes[3] && this.etapes[3].dateFin === null) {
            this.updateEtapeDateFin(4);
          }
          if (bobinagesMT.every(b => b.bt2 !== null) && this.etapes[4] && this.etapes[4].dateFin === null) {
            this.updateEtapeDateFin(5);
          }
          if (bobinagesMT.every(b => b.bt3 !== null) && this.etapes[5] && this.etapes[5].dateFin === null) {
            this.updateEtapeDateFin(6);
          }
        }
      );
  }

  fetchAndUpdateMagnetiques() {
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

          if (allConditionsMet && this.etapes[6] && this.etapes[6].dateFin === null && this.etapes[7] && this.etapes[7].dateFin === null) {
            this.updateEtapeDateFin(7);
            this.updateEtapeDateFin(8);
          }
        }
      );
  }

  fetchAndUpdateMontages() {
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

          if (allConditionsMet && this.etapes[8] && this.etapes[8].dateFin === null && this.etapes[9] && this.etapes[9].dateFin === null && allConditionsMet && this.etapes[10] && this.etapes[10].dateFin === null && allConditionsMet && this.etapes[11] && this.etapes[11].dateFin === null) {
            this.updateEtapeDateFin(9);
            this.updateEtapeDateFin(10);
            this.updateEtapeDateFin(11);
            this.updateEtapeDateFin(12);
          }
        }
      );
  }

  fetchAndUpdateEncuvage() {
    this.EcuvageService.getEcuvageByTransformateurId(this.transformateurId)
      .subscribe(
        Ecuvages => {
          const allConditionsMet = Ecuvages.every(item =>
            item.conformite !== null
          );

          if (allConditionsMet && this.etapes[12] && this.etapes[12].dateFin === null && this.etapes[13] && this.etapes[13].dateFin === null )
          {
            this.updateEtapeDateFin(13);
            this.updateEtapeDateFin(14);
          }
        }
      );
  }

  fetchAndUpdateRemplissage() {
    this.RemplissageService.getRemplissagesByTransformateurId(this.transformateurId)
      .subscribe(
        Remplissages => {
          const allConditionsMet = Remplissages.every(item =>
            item.cnc !== null
          );

          if (allConditionsMet && this.etapes[14] && this.etapes[14].dateFin === null && this.etapes[15] && this.etapes[15].dateFin === null )
          {
            this.updateEtapeDateFin(15);
            this.updateEtapeDateFin(16);
          }
        }
      );
  }

  fetchAndUpdatePeinture() {
    this.PeintureService.getPeintureByTransformateurId(this.transformateurId)
      .subscribe(
        Peintures => {
          const allConditionsMet = Peintures.some(item =>
            item.cnc==='C'
          );

          if (allConditionsMet && this.etapes[16] && this.etapes[16].dateFin === null)
          {
            this.updateEtapeDateFin(17);
          }
        }
      );
  }

  fetchAndUpdateConseption() {
    this.ConseptionService.getConseptionsByTransformateur(this.transformateurId)
      .subscribe(
        Conseptions => {
          const allConditionsMet = Conseptions.every(item =>
            item.conformiter==='Yes'
          );

          if (allConditionsMet && this.etapes[17] && this.etapes[17].dateFin === null)
          {
            this.updateEtapeDateFin(18);
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
  }

  updateEtape(etapeNumero: number) {

    // Find the selected etape from filteredEtapes
    const selectedFilteredEtape = this.etapes.find(et => et.etapeNumero === etapeNumero);
    if (!selectedFilteredEtape) {
      return;
    }

    // Check the number of selected items
    const selectedItems = this.selectedItemsMap[etapeNumero];
    if (selectedItems && selectedItems.length > 2) {
      this.MessageService.add({ severity: 'info', summary: 'Info', detail: 'Vous ne pouvez sélectionner que jusqu\'à deux éléments.' });
      return;
    }

    // Update operateur1 and operateur2 based on selected items
    selectedFilteredEtape.operateur1 = selectedItems && selectedItems.length > 0 ? selectedItems[0] : null;
    selectedFilteredEtape.operateur2 = selectedItems && selectedItems.length > 1 ? selectedItems[1] : null;
// Check if operateur1 is present and not already in suggestions
if (selectedFilteredEtape?.operateur1 && !this.suggestions.includes(selectedFilteredEtape.operateur1)) {
  console.log(selectedFilteredEtape.operateur1);
  this.operateurSuggestion.nom = selectedFilteredEtape.operateur1;
  this.OperateurService.AddSuggestion(this.operateurSuggestion).subscribe({
    next: (response) => {
      this.suggestions.push(response);
    }
  });
}

// Check if operateur2 is present and not already in suggestions
if (selectedFilteredEtape?.operateur2 && !this.suggestions.includes(selectedFilteredEtape.operateur2)) {
  console.log(selectedFilteredEtape.operateur2);
  this.operateurSuggestion.nom = selectedFilteredEtape.operateur2;
  this.OperateurService.AddSuggestion(this.operateurSuggestion).subscribe({
    next: (response) => {
      this.suggestions.push(response);
    }
  });
}

    // Update dateDebut for the selected etape
    if (selectedFilteredEtape) {
      selectedFilteredEtape.dateDebut = new Date();

      // Apply changes from selectedFilteredEtape to the original etape
      const index = this.etapes.findIndex(et => et.etapeNumero === etapeNumero);
      if (index !== -1) {
        this.etapes[index] = { ...this.etapes[index], ...selectedFilteredEtape };
      }

      // Update the etape via service
      this.serviceE.UpdateEtape(this.transformateurId, etapeNumero, selectedFilteredEtape)
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
      return [1, 4, 7, 9, 13, 15, 17, 18].includes(etapeNumero);
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
        case 13:
          return 'Encuvage';
        case 15:
          return 'Remplissage et Etancheite';
        case 17:
          return 'Peinture';
        case 18:
          return 'Conseption';
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
        case 13:
            return ['/Ecuvage', this.transformateurId,etapeNumero];
        case 15:
          return ['/Remplissage', this.transformateurId,etapeNumero];
        case 17:
          return ['/Peinture', this.transformateurId,etapeNumero];
        case 18:
          return ['/Conseption', this.transformateurId,etapeNumero];
        default:
          // Add default route or handle other cases as needed
          return ['/DefaultRoute'];
      }
    }



    END_OF_PRODUCTION() {
      if (
        this.etapes.every(item => item.dateFin !== undefined) &&
        this.Service.list.length > 0 &&
        this.Service.list[0].dateFin?.toString() === "0001-01-01T00:00:00"
      ) {
        this.Service.list[0].dateFin = new Date();
        this.Service.UpdateTransformateur(this.transformateurId, this.Service.list[0]).subscribe({
          next: (response) => {
            console.log("Finished updating dateFin");
          },
          error: (error) => {
            console.error("Error updating dateFin:", error);
          }
        });
      }
    }



}




