import { Component, OnInit } from '@angular/core';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
@Component({
  selector: 'app-Livraison-component',
  templateUrl: './Livraison-component.component.html',
  styleUrls: ['./Livraison-component.component.css']
})
export class LivraisonComponentComponent implements OnInit {

  list: Transformateur[] = [];

  constructor(public Service: TransformateurServiceService) { }

  ngOnInit() {
    this.Service.getTransformateurAndItsPvs()
    .subscribe({
      next:(Result : Transformateur[]) =>
      {
        this.list=Result;
        console.log(this.list)
      }
    });
  }

}
