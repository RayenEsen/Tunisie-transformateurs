import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { SessionService } from '../utils/session-service.service';
import { EventServiceService } from '../Shared/Event-service.service'
import { Event } from '../Shared/Event-service.model'
import { Conseption } from '../Shared/Conseption-service.model';
import { ConseptionServiceService } from '../Shared/Conseption-service.service';
import { ConseptionValues } from '../Shared/ConseptionValues-service.model';
import { ConseptionValuesServiceService } from '../Shared/ConseptionValues-service.service';

@Component({
  selector: 'app-Conseption-component',
  templateUrl: './Conseption-component.component.html',
  styleUrls: ['./Conseption-component.component.css']
})
export class ConseptionComponentComponent implements OnInit {

  etapenumero:number = 0;
  transformateurId: number = 0;
  conseption: Conseption[] = [];
  constructor(
    public ServiceConseption: ConseptionServiceService,
    public ServiceConseptionValues : ConseptionValuesServiceService,
    public router: Router,
    private route: ActivatedRoute,
    public service: TransformateurServiceService,
    public ServiceE: EtapeServiceService,
    public ServiceS: SessionService,
    public eventService : EventServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero = +params['etapenumero'] || 0;
      if (this.transformateurId) {
        this.ServiceConseption.getConseptionsByTransformateur(this.transformateurId)
          .subscribe(
            (result: Conseption[]) => {
              this.conseption = result;
              console.log(this.conseption);
            },
            error => {
              console.error('Error fetching Conseptions by Transformateur ID:', error);
            }
          );
          this.service.GetTransformateur(this.transformateurId);
      }
    });
  }


}
