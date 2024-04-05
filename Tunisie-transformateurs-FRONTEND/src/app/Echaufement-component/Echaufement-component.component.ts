import { Component, OnInit } from '@angular/core';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
@Component({
  selector: 'app-Echaufement-component',
  templateUrl: './Echaufement-component.component.html',
  styleUrls: ['./Echaufement-component.component.css']
})
export class EchaufementComponentComponent implements OnInit {


  list: Transformateur[] = [];

  constructor(public Service: TransformateurServiceService) { }

  ngOnInit() {
    this.Service.getTransformateurAndItsPvs()
      .subscribe({
        next: (Result: Transformateur[]) => {
          console.log(Result);
          this.list = Result.filter(item => item.etat === "Prototype");
        }
      });
  }


}
