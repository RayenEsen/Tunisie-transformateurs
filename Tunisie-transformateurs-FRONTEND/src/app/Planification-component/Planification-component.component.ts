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

}
