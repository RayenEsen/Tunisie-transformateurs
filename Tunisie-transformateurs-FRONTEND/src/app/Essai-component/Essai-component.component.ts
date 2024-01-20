  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
  import { Pv } from '../Shared/Pv-service.model';
  import { PvServiceService } from '../Shared/Pv-service.service';

  @Component({
    selector: 'app-Essai-component',
    templateUrl: './Essai-component.component.html',
    styleUrls: ['./Essai-component.component.css']
  })
  export class EssaiComponentComponent implements OnInit {

    currentDate: string = '';
    transformateurId: number = 0;
    pv: Pv[] | undefined;

    constructor(
      private route: ActivatedRoute,
      public service: TransformateurServiceService,
      public pvService: PvServiceService
    ) { }

    ngOnInit() {
      this.getCurrentDate();
      this.route.params.subscribe(params => {
        this.transformateurId = +params['id'] || 0;

        if (this.transformateurId) {
          this.service.GetTransformateur(this.transformateurId);
          console.log('Transformateur Data:', this.service.list);
        }
        this.pvService.getPvByTransformerId(this.transformateurId).subscribe(
          (pvData: Pv[]) => {
            this.pv = pvData;
            console.log('Pv Data:', this.pv);
          },
          error => {
            console.error('Error fetching Pv data:', error);
          }
        );
      }
      );
    }
    savePvValues() {
      if (this.pv && this.pv.length > 0 && this.pv[0].id_pv !== undefined) {
        // Call a service method to update the Pv values on the server
        this.pvService.UpdatePv(this.pv[0].id_pv, this.pv[0]).subscribe(
          response => {
            console.log('Pv values updated successfully', response);
          },
          error => {
            console.error('Error updating Pv values', error);
          }
        );
      }
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
