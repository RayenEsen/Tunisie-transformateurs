import { Component, OnInit } from '@angular/core';
import { EchauffementBT } from '../Shared/EchaufementBT-service.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EchafementBTServiceService } from '../Shared/EchaufementBT-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-EchaufMT-component',
  templateUrl: './EchaufMT-component.component.html',
  styleUrls: ['./EchaufMT-component.component.css']
})
export class EchaufMTComponentComponent implements OnInit {


  echaufements : EchauffementBT[] = []
  transformateurId!: number ;
  constructor(public router: ActivatedRoute,public ServiceEchauf : EchafementBTServiceService, public ServiceM : MessageService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
    });

    // Create and push the first echaufement
    this.ServiceEchauf.checkOrCreateEchauffement(this.transformateurId, "MT").subscribe({
      next: (response) => {
        this.echaufements = response;
        console.log(this.echaufements)
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  convertSecondsToMinutes(seconds: number) {
    if (isNaN(seconds) || seconds < 0) {
      return ''; // Return an empty string or any other default value if seconds is not valid
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes} min, ${remainingSeconds} s`;
    } else {
      return `${seconds} s`;
    }
  }


   CalculateI(echauf: EchauffementBT): number {
    let result: number = echauf.ushunt / this.echaufements[0].rshunt;

    // Check if the result is NaN
    if (isNaN(result)) {
      return 0;
    } else {
      return result;
    }
  }


  Calculater2(echauf: EchauffementBT) {
    const index = this.echaufements.findIndex(item => item.btid === echauf.btid);
    const result = echauf.u / this.CalculateI(echauf);

    if (isNaN(result)) {
      return 0;
    }

    this.echaufements[index].resultat = result;
    return result;
  }

    transform(value: number): string {

    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${minutes}m ${seconds}s`;
  }

  update() {

    // Initialize temp variable to start at the temperature of the first echauffement
    let temp = this.echaufements[1].temp;

    // Loop through each echauffement, starting from the second one
    for (let i = 2; i < this.echaufements.length; i++) {
      // Increment temp by 15 for each echauffement
      temp += 15;

      // Set the temperature of the current echauffement to the updated temp value
      this.echaufements[i].temp = temp;

    }


    this.ServiceEchauf.updateEchauffement(this.echaufements).subscribe({
      next: (response) => {
        this.ServiceM.add({ severity: 'success', summary: 'Success', detail: 'Les informations sont enregistrées' });
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle error if needed
      }
    });

  }



}
