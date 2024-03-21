import { Component, OnInit } from '@angular/core';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rapport } from '../Shared/Rapport-service.model';
import { RapportServiceService } from '../Shared/Rapport-service.service';
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
  constructor(public ServiceR : RapportServiceService,public service : TransformateurServiceService,public router: Router,private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero = +params['etapenumero'] || 0;

      this.service.GetTransformateur(this.transformateurId);

    });
  }
  save()
  {
    this.Rapport.origine= this.etat.name;
    this.Rapport.etat= this.etat2.name;
    this.Rapport.Id_Etape= this.etapenumero;
    console.log(this.Rapport)
    this.ServiceR.AddRapport(this.Rapport).subscribe({
      next : (response) =>
      {
        this.Rapport=response;
      }
    })
  }

}
