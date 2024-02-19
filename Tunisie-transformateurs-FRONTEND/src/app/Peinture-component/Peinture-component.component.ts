import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { EventServiceService } from '../Shared/Event-service.service';
import { Event } from '../Shared/Event-service.model';
@Component({
  selector: 'app-Peinture-component',
  templateUrl: './Peinture-component.component.html',
  styleUrls: ['./Peinture-component.component.css']
})
export class PeintureComponentComponent implements OnInit {


  transformateurId: number = 0;

  constructor(public router: Router,private route: ActivatedRoute , public service : TransformateurServiceService, public eventService : EventServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.service.GetTransformateur(this.transformateurId);
    });
  }


}
