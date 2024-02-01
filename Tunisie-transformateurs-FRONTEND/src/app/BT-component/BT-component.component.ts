import { Component, OnInit } from '@angular/core';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-BT-component',
  templateUrl: './BT-component.component.html',
  styleUrls: ['./BT-component.component.css']
})
export class BTComponentComponent implements OnInit {

  transformateurId: number = 0;
  numeroEtape: number = 0;
  etape : Etape = new Etape;
  constructor(public serviceE: EtapeServiceService, public service: TransformateurServiceService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.numeroEtape = +params['etapenumero'] || 0;
      this.service.GetTransformateur(this.transformateurId);
      this.serviceE.getEtapeByNumeroAndTransformateur(this.numeroEtape, this.transformateurId)
      .subscribe(
        etape => {
          this.etape=etape;
          console.log(this.etape)
        },
        error => {
          console.error('Error loading Etape', error);
        }
      );    });
  }
}
