import { Component, OnInit } from '@angular/core';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rapport } from '../Shared/Rapport-service.model';
import { RapportServiceService } from '../Shared/Rapport-service.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-Repport-component',
  templateUrl: './Repport-component.component.html',
  styleUrls: ['./Repport-component.component.css']
})
export class RepportComponentComponent implements OnInit {


  transformateurId: number = 0;
  etapenumero:number = 0;

  Rapport = new Rapport;
  Origines: any[] =[
    {name : 'Matiéres'},
    {name : 'Materiel'},
    {name : 'Méthode'},
    {name : 'Millieu'},
    {name : "Main d'oeuvre"},
  ]

  ChoixEtat: any[] =[
    {name : 'En attente'},
    {name : 'En cours'},
    {name : 'Cloture'},
    {name : 'En attente et Essaie'},
  ]

  etat : any;
  etat2: any;


  selectedOrigine: any; // Declare selectedCountry property
  selectedChoix: any; // Declare selectedCountry property

  onOrigineChange(event: any) {
    this.selectedOrigine = event.value;
  }

  onChoixChange(event: any) {
    this.selectedChoix = event.value;
  }
  constructor(private messageService: MessageService,public ServiceR : RapportServiceService,public service : TransformateurServiceService,public router: Router,private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero = +params['etapenumero'] || 0;

      this.service.GetTransformateur(this.transformateurId);
      this.ServiceR.getRapportByEtapeId(this.etapenumero).subscribe({
        next : (response) =>
        {
          this.Rapport = response;
          this.etat = this.Origines.find(origine => origine.name === response.origine);
          this.selectedOrigine = this.etat; // Assign etat to selectedOrigine
          this.etat2 = this.ChoixEtat.find(choix => choix.name === response.etat)
          this.selectedChoix = this.etat2;
        }
      })
    });
  }


  save() {
    console.log(this.etat);
    this.Rapport.origine = this.etat.name;
    this.Rapport.etat = this.etat2.name;
    this.Rapport.Id_Etape = this.etapenumero;
    this.Rapport.dater = new Date();

    this.ServiceR.upsertRapport(this.Rapport).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Les informations ont été enregistrées.' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de l\'enregistrement des informations.' });
      }
    });
  }



  formatDate(date: string | Date): string {
    const dateString = typeof date === 'string' ? date : date?.toISOString();
    return dateString ? new Date(dateString).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}
