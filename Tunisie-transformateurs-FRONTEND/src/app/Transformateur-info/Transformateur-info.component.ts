import { Component, OnInit } from '@angular/core';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';

@Component({
  selector: 'app-Transformateur-info',
  templateUrl: './Transformateur-info.component.html',
  styleUrls: ['./Transformateur-info.component.css']
})
export class TransformateurInfoComponent implements OnInit {


  constructor(private service: TransformateurServiceService) { }

  ngOnInit() {
    this.service.refreshList();
  }

}
