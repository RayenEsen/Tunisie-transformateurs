import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BobinageMTServiceService } from '../Shared/BobinageMT-service.service';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { BobinageMT } from '../Shared/BobinageMT-service.model';

@Component({
  selector: 'app-BobinageMT-component',
  templateUrl: './BobinageMT-component.component.html',
  styleUrls: ['./BobinageMT-component.component.css']
})
export class BobinageMTComponentComponent implements OnInit {

  transformateurId: number = 0;
  bobinagesMT: BobinageMT[] = [];

  constructor(
    public ServiceMT: BobinageMTServiceService,
    public router: Router,
    private route: ActivatedRoute,
    public service: TransformateurServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;

      if (this.transformateurId) {
        this.ServiceMT.getBobinageByTransformateurId(this.transformateurId)
          .subscribe((result: BobinageMT[]) => {
            this.bobinagesMT = result;
            console.log(this.bobinagesMT);
          });
        this.service.GetTransformateur(this.transformateurId);
      }
    });
  }

  Update() {
    this.ServiceMT.UpdateListBobinage(this.bobinagesMT).subscribe(
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
