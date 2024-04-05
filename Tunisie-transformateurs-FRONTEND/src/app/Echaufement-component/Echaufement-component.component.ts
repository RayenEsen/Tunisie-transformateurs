import { Component, OnInit } from '@angular/core';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-Echaufement-component',
  templateUrl: './Echaufement-component.component.html',
  styleUrls: ['./Echaufement-component.component.css']
})
export class EchaufementComponentComponent implements OnInit {


  list: Transformateur[] = [];

  constructor(public Service: TransformateurServiceService, public ServiceM : MessageService) { }

  ngOnInit() {
    this.Service.getTransformateurAndItsPvs()
      .subscribe({
        next: (Result: Transformateur[]) => {
          console.log(Result);
          this.list = Result.filter(item => item.etat === "Prototype");
        }
      });
  }


  clonedTransformateurs: { [s: string]: Transformateur; } = {};

  onRowEditInit(transformateur: Transformateur) {
    // Assuming 'numero' is a unique identifier for each Transformateur
    this.clonedTransformateurs[transformateur.numero] = {...transformateur};
}


  onRowEditSave(transformateur : Transformateur)
  {
    console.log("test")
    this.Service.UpdateTransformateur(transformateur.numero,transformateur).subscribe({
      next : (Response) =>
        {
          this.ServiceM.add({ severity: 'success', summary: 'Enregistré', detail: 'Données du transformateur '+ transformateur.numero +' sauvegardées.' });
        }
    })
  }

  onRowEditCancel(transformateur: Transformateur, index: number) {
    // Assuming 'numero' is a unique identifier for each Transformateur
    // Assuming you have access to the original list of Transformateurs
    if (index !== -1 && this.list[index]) {
        this.list[index] = this.clonedTransformateurs[transformateur.numero];
        delete this.clonedTransformateurs[transformateur.numero];
    }
}



}
