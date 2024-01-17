import { Component, OnInit } from '@angular/core';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-Add-component',
  templateUrl: './Add-component.component.html',
  styleUrls: ['./Add-component.component.css']
})
export class AddComponentComponent implements OnInit {

  TransformateurAjouter : Transformateur =
  {
    numero: 0,
    marque: '',
    client: '',
    norme: '',
    power: '',
    mtu1: 0,
    mtu2: 0,
    btu2: 0,
    bti2: 0,
    nbphase: 0,
    prises: '',
    couplage: '',
    cooling: '',
    frequency: 0
  }

  constructor(public service: TransformateurServiceService) { }

  ngOnInit() {
  }
  submitForm() {
    try {
      // Call your service method with the form data
      this.service.AddTransformateur(this.TransformateurAjouter)
        .subscribe({
          next: response => {
            // The observable is successful, handle the response
            console.log('Transformateur added successfully', response);
          },
          error: error => {
            // The observable encountered an error, handle the error
            console.error('Error adding Transformateur', error);
          }
        });
    } catch (error) {
      // Handle other types of errors, if any
      console.error('Error adding Transformateur', error);
    }
  }
}
