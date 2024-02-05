import { Component, OnInit } from '@angular/core';
import { Montage } from '../Shared/Montage-service.model';
import { MontageServiceService } from '../Shared/Montage-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';

@Component({
  selector: 'app-Montage-component',
  templateUrl: './Montage-component.component.html',
  styleUrls: ['./Montage-component.component.css']
})
export class MontageComponentComponent implements OnInit {

  transformateurId: number = 0;
  Montages: Montage[] = [];


  constructor(public ServiceMontage : MontageServiceService,public router: Router,private route: ActivatedRoute , public service : TransformateurServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;

      if (this.transformateurId) {
        this.ServiceMontage.getMontageByTransformateurId(this.transformateurId)
          .subscribe((result: Montage[]) => {
            this.Montages = result;
            console.log(this.Montages);
          });
          this.service.GetTransformateur(this.transformateurId);
      }
    });
  }
  Update()
  {

    this.ServiceMontage.UpdateListMontage(this.Montages).subscribe(
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
