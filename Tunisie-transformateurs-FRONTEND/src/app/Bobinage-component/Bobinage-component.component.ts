import { Component, OnInit } from '@angular/core';
import { BobinageServiceService } from '../Shared/Bobinage-service.service'
import { Bobinage } from '../Shared/Bobinage-service.model'
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { EtapeServiceService } from '../Shared/Etape-service.service';
@Component({
  selector: 'app-Bobinage-component',
  templateUrl: './Bobinage-component.component.html',
  styleUrls: ['./Bobinage-component.component.css']
})
export class BobinageComponentComponent implements OnInit {

  transformateurId: number = 0;
  bobinages: Bobinage[] = [];

  constructor(public ServiceB : BobinageServiceService,public router: Router,private route: ActivatedRoute , public service : TransformateurServiceService , public ServiceE : EtapeServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;

      if (this.transformateurId) {
        this.ServiceB.getBobinageByTransformateurId(this.transformateurId)
          .subscribe((result: Bobinage[]) => {
            this.bobinages = result;
            console.log(this.bobinages);
          });
          this.service.GetTransformateur(this.transformateurId);
      }
    });
  }

  Update()
  {
    this.ServiceB.UpdateListBobinage(this.bobinages).subscribe(
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
