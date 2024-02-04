import { Component, OnInit } from '@angular/core';
import { Magnetique } from '../Shared/Magnetique-service.model';
import { MagnetiqueServiceService } from '../Shared/Magnetique-service.service'
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';

@Component({
  selector: 'app-Magnetique-component',
  templateUrl: './Magnetique-component.component.html',
  styleUrls: ['./Magnetique-component.component.css']
})
export class MagnetiqueComponentComponent implements OnInit {

  transformateurId: number = 0;
  Magnetiques: Magnetique[] = [];

  constructor(public ServiceM : MagnetiqueServiceService,public router: Router,private route: ActivatedRoute , public service : TransformateurServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;

      if (this.transformateurId) {
        this.ServiceM.getMagnetiqueByTransformateurId(this.transformateurId)
          .subscribe((result: Magnetique[]) => {
            this.Magnetiques = result;
            console.log(this.Magnetiques);
          });
          this.service.GetTransformateur(this.transformateurId);
      }
    });
  }
  Update()
  {

    this.ServiceM.UpdateListBobinage(this.Magnetiques).subscribe(
      () => {
        console.log('Bobinages updated successfully');
        // Add any additional logic after the update if needed
      },
      error => {
        console.error('Error updating bobinages:', error);
        // Handle the error as needed
      }
    );
  }
    // Function to handle the print action
    onPrint() {
      window.print();

    }
}
