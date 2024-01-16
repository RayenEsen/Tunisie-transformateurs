import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';

@Component({
  selector: 'app-Essai-component',
  templateUrl: './Essai-component.component.html',
  styleUrls: ['./Essai-component.component.css']
})
export class EssaiComponentComponent implements OnInit {

  currentDate: string = '';
  transformateurId: number = 0;

  constructor(
    private route: ActivatedRoute,
    public service: TransformateurServiceService
  ) { }

  ngOnInit() {
    this.getCurrentDate();
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;

      if (this.transformateurId) {
        this.service.GetTransformateur(this.transformateurId);
        console.log('Transformateur Data:', this.service.list);
      }
    });
  }

  getCurrentDate() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

    // Format the date as "DD/MM/YYYY"
    this.currentDate = today.toLocaleDateString('en-US', options);
  }

  // Function to handle the print action
  onPrint() {
    window.print();
  }
}
