import { Component, OnInit } from '@angular/core';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Transformateur } from '../Shared/Transformateur-service.model';

@Component({
  selector: 'app-Transformateur-info',
  templateUrl: './Transformateur-info.component.html',
  styleUrls: ['./Transformateur-info.component.css']
})
export class TransformateurInfoComponent implements OnInit {


  constructor(public service: TransformateurServiceService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  onDelete(id:number)
  {
    this.service.DeleteTransformateur(id)
    .subscribe({
      next :res => {
        this.service.list = res as Transformateur[]
      },
      error: err => { console.log(err)}
    })
  }
}
