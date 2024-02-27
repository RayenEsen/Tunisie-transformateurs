import { Component, OnInit } from '@angular/core';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { MessageService } from 'primeng/api';

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

  constructor(public Service: TransformateurServiceService,public ServiceM : MessageService) { }

  ngOnInit() {
    this.Service.getTransformateurAndItsPvs()
    .subscribe({
      next:(Result : Transformateur[]) =>
      {
        console.log(Result)

        Result = Result.filter(item => item.etat==="Production")
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
    this.Service.filter(this.Choix1,this.Choix2)
    .subscribe({
      next:(Result : Transformateur[]) =>
      {
        this.list=Result;
        console.log(Result);
      }
    })
  }


  isDateFinDefault(transformateur: any): boolean {
    return transformateur.dateFin === '0001-01-01T00:00:00';
  }


  saveDateLivraison(transformateur: Transformateur) {
    this.Service.UpdateTransformateur(transformateur.numero, transformateur).subscribe({
      next: (response) => {
        this.ServiceM.add({ severity: 'success', summary: 'Succès', detail: 'Date Livraison mise à jour avec succès' });
      },
      error: (error) => {
        console.error('An error occurred while updating transformateur:', error);
        // Handle error here, show error message to user, etc.
      }
    });
  }


}
