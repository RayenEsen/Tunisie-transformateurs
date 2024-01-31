import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';

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
    public serviceE: EtapeServiceService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;

      // Fetch Etapes by Transformateur id
      this.serviceE.getEtapesByTransformateurId(this.transformateurId)
        .subscribe(
          etapes => {
            console.log(etapes)
            this.etapes = etapes; // Store fetched Etapes in the array
          },
          error => {
            console.error('Error loading Etapes', error);
          }
        );
    });
  }
}
