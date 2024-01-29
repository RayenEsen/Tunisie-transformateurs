import { Component, OnInit } from '@angular/core';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
@Component({
  selector: 'app-Planification-component',
  templateUrl: './Planification-component.component.html',
  styleUrls: ['./Planification-component.component.css']
})
export class PlanificationComponentComponent implements OnInit {

  list: Transformateur[] = [];
  searchItem: string = '';
  Choix1: string = '';
  Choix2: string = '';

  constructor(public Service: TransformateurServiceService) { }

  ngOnInit() {
    this.Service.getTransformateurAndItsPvs()
    .subscribe({
      next:(Result : Transformateur[]) =>
      {
        this.list=Result;
      }
    });
  }
  Search()
  {
    this.Service.searchTransformateurs(this.searchItem)
    .subscribe({
      next:(Result : Transformateur[]) =>
      {
        console.log(this.searchItem)
        this.list=Result;
      }
    });
  }

  filtrer()
  {
    console.log("Choix1 = "+this.Choix1)
    console.log("Choix2 = "+this.Choix2)
    this.Service.filter(this.Choix1,this.Choix2)
    .subscribe({
      next:(Result : Transformateur[]) =>
      {
        this.list=Result;
        console.log(Result);
      }
    })
  }

}
