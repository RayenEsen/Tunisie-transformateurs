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
  closable2: boolean = true; // Set to true to make the inplace element closable

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
  filteredSuggestions : string[] = [];
  rangeDatesMap: Map<number, Date[]> = new Map<number, Date[]>();

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

                  this.END_OF_PRODUCTION();
              },
              error => {
                  console.error('Error loading Etapes', error);
              }
          );
    });
  }

  updateRangeDates(value: Date[], etapeNumero: number) {
    this.rangeDatesMap.set(etapeNumero, value);
  }

    // Initialize the date map
  initializeDateMap(): void {
    this.etapes.forEach(etape => {
      const dateRange: Date[] = [new Date(), new Date()]; // Initialize with default dates or null
      this.rangeDatesMap.set(etape.etapeNumero, dateRange);
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
        this.suggestions = response;
      }
    });

    let query = event.query; // Keep the query as it is without converting to lowercase

    // Filter the suggestions based on the query
    this.filteredSuggestions = this.suggestions.filter(suggestion =>
      typeof suggestion === 'string' &&
      suggestion.toLowerCase().startsWith(query.toLowerCase())
    );

    // If the searched suggestion doesn't exist in filteredSuggestions and the array is not empty, add it to the beginning
    if (this.filteredSuggestions.length === 0 && !this.filteredSuggestions.includes(query)) {
      this.filteredSuggestions.unshift(query);
    }
  }


  verif(etape: Etape) {
    if (etape.operateur1 || etape.operateur2) {
      if(etape.dateDebut!==null && etape.dateFin!==null)
      {
        this.router.navigate(this.getRouterLink(etape.etapeNumero));
      }
      else
      {
        this.MessageService.add({ severity: 'error', summary: 'Erreur', detail: 'Date est requis pour continuer.' });
      }
    } else {
      this.MessageService.add({ severity: 'error', summary: 'Erreur', detail: 'Opérateur est requis pour continuer.' });
    }
  }


  closable: boolean = true;

  toggleclosable() {
    this.closable = !this.closable;
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
  this.suggestions.push(selectedFilteredEtape.operateur1);

  this.operateurSuggestion.nom = selectedFilteredEtape.operateur1;
  this.OperateurService.AddSuggestion(this.operateurSuggestion).subscribe({
    next: (response) => {
      // Handle the response if needed
    }
  });
}

// Check if operateur2 is present and not already in suggestions
if (selectedFilteredEtape?.operateur2 && !this.suggestions.includes(selectedFilteredEtape.operateur2)) {
  this.suggestions.push(selectedFilteredEtape.operateur2);

  this.operateurSuggestion.nom = selectedFilteredEtape.operateur2;
  this.OperateurService.AddSuggestion(this.operateurSuggestion).subscribe({
    next: (response) => {
      // Handle the response if needed
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

      // Apply changes from selectedFilteredEtape to the original etape
      const index = this.etapes.findIndex(et => et.etapeNumero === etapeNumero);
      if (index !== -1) {
        this.etapes[index] = { ...this.etapes[index], ...selectedFilteredEtape };
      }
      const dateRange = this.rangeDatesMap.get(etapeNumero);

      // Check if dateRange is not null or undefined
      if (dateRange) {
        // Find the etape in the etapes array
        const etapeselected = this.etapes.find(et => et.etapeNumero === etapeNumero);

        // Check if etapeselected is not null or undefined
        if (etapeselected) {
          // Update etape.datedebut and etape.detafin
          etapeselected.dateDebut = dateRange[0];
          etapeselected.dateFin = dateRange[1];
        }
      }
      // Update the etape via service
      this.serviceE.UpdateEtape(this.transformateurId, etapeNumero, selectedFilteredEtape)
        .subscribe(
          () => {

          },
          error => {
            console.error('Error updating Etape', error);
          }
        );
    }
  }



    getOrderValue(numeroETAPE: number): number {

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
          return 'Chaudronnerie';
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
      const allConforme = this.etapes.every(item => item.resultat === 'Conforme');
      
      const nonConformeItems = this.etapes.filter(item => item.resultat === 'Non conforme');
      const allNonConformeTreated = nonConformeItems.length > 0 ? 
          nonConformeItems.every(item => item.traitement === 'Oui') : false;
      
      const NewDateFin = this.Service.list?.[0]?.dateFin?.toString() === "0001-01-01T00:00:00";
      
      console.log(allConforme);
      console.log(allNonConformeTreated);
      console.log(NewDateFin);
  
      if ((allConforme || allNonConformeTreated) && NewDateFin) {
          this.Service.list[0].dateFin = new Date(); // Assign current date
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




