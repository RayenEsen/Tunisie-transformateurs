import { Component, OnInit } from '@angular/core';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { Etape } from '../Shared/Etape-servicemodel';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Bobinage } from '../Shared/Bobinage-service.model';
import { BobinageServiceService } from '../Shared/Bobinage-service.service';
import { BobinageMT } from '../Shared/BobinageMT-service.model';
import { BobinageMTServiceService } from '../Shared/BobinageMT-service.service';
import { MagnetiqueServiceService } from '../Shared/Magnetique-service.service';
import { Magnetique } from '../Shared/Magnetique-service.model';
import { Montage } from '../Shared/Montage-service.model';
import { MontageServiceService } from '../Shared/Montage-service.service';
import { Ecuvage } from '../Shared/Ecuvage-service.model';
import { EcuvageServiceService } from '../Shared/Ecuvage-service.service';
import { Remplissage } from '../Shared/Remplissage-service.model';
import { RemplissageServiceService } from '../Shared/Remplissage-service.service';
import { Peinture } from '../Shared/Peinture-service.model';
import { PeintureServiceService } from '../Shared/Peinture-service.service';
import { Conseption } from '../Shared/Conseption-service.model';
import { ConseptionServiceService } from '../Shared/Conseption-service.service';
@Component({
  selector: 'app-DashBoard-component',
  templateUrl: './DashBoard-component.component.html',
  styleUrls: ['./DashBoard-component.component.css']
})
export class DashBoardComponentComponent implements OnInit {

  constructor(public service: TransformateurServiceService,
  public ServiceE : EtapeServiceService,
  public ServiceBobinage : BobinageServiceService,
  public ServiceBobinageMT : BobinageMTServiceService,
  public ServiceMagnetique : MagnetiqueServiceService,
  public ServiceMontage : MontageServiceService,
  public ServiceEcuvage : EcuvageServiceService,
  public ServiceRemplissage : RemplissageServiceService,
  public ServicePeinture : PeintureServiceService,
  public ServiceConseption : ConseptionServiceService,
  ) { }

    /*Stuff That will get deleted L8ater*/
    data: any;
    date2: any;
    data5:any;
    data6:any;
    data7: any;
    data9: any;
    /*--------------------------------------*/

  list: Transformateur[] = [];
  Etape : Etape[] = [];


  originalList: Transformateur[] = []; // Variable to store the original list
  originalEtape: Etape[] = []; // Variable to store the original list

  searchkey : string = '';
  ngOnInit() {

  /*Stuff That will get deleted L8ater*/
  this.data = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        data: [300, 200, 400, 150 ], // Example data for each category
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] // Example background colors for each category
      }
    ]
  };
  this.date2 = {
    "labels": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

    "datasets": [
      {
        "label": "Sales",
        "data": [65, 59, 80, 81, 56, 55, 40 , 65, 59, 80, 81, 56, 55, 40],
        "backgroundColor": "rgba(255, 99, 132, 0.2)",
        "borderColor": "rgba(255, 99, 132, 1)",
        "borderWidth": 1
      },
      {
        "label": "Expenses",
        "data": [28, 48, 40, 19, 86, 27, 90 , 10, 30, 11, 30, 25, 27, 60],
        "backgroundColor": "rgba(54, 162, 235, 0.2)",
        "borderColor": "rgba(54, 162, 235, 1)",
        "borderWidth": 1
      },
      {
        "label": "Repared",
        "data": [10, 30, 11, 30, 25, 27, 60 , 28, 48, 40, 19, 86, 27, 90],
        "backgroundColor": "rgba(46, 204, 113, 0.2)",
        "borderColor": "rgba(39, 174, 96, 1)",
        "borderWidth": 1
      }
    ]
  }
  this.data5 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Dataset 1',
              data: [65, 59, 80, 81, 56, 55, 40], // Example data points for Dataset 1
              fill: false, // Whether to fill the area under the line
              borderColor: 'rgb(75, 192, 192)', // Color of the line
              tension: 0.1 // How curvy the line is
          },
          {
              label: 'Dataset 2',
              data: [45, 55, 60, 70, 50, 40, 30], // Example data points for Dataset 2
              fill: false, // Whether to fill the area under the line
              borderColor: 'rgb(255, 99, 132)', // Color of the line
              tension: 0.1 // How curvy the line is
          }
      ]
  };
  this.data6 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Sales 2023',
            data: [25000, 24500, 25500, 24000, 23500, 23000, 23500, 22500, 22000, 21500, 21000, 21500],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4
        },
        {
            label: 'Sales 2024',
            data: [20000, 20500, 19500, 20200, 19800, 20500, 19800, 20200, 20500, 20800, 21000, 20500],
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.4
        }
    ]
};

this.data9 = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
      {
          label: 'My First Dataset',
          data: [65, 59, 90, 81, 56, 55, 40], // Example data points for the first dataset
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Background color of the area
          borderColor: 'rgba(255, 99, 132, 1)', // Border color of the area
          pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Background color of the points
          pointBorderColor: '#fff', // Border color of the points
          pointHoverBackgroundColor: '#fff', // Background color of the points when hovered
          pointHoverBorderColor: 'rgba(255, 99, 132, 1)' // Border color of the points when hovered
      },
      {
          label: 'My Second Dataset',
          data: [28, 48, 40, 19, 96, 27, 100], // Example data points for the second dataset
          backgroundColor: 'rgba(54, 162, 235, 0.2)', // Background color of the area
          borderColor: 'rgba(54, 162, 235, 1)', // Border color of the area
          pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Background color of the points
          pointBorderColor: '#fff', // Border color of the points
          pointHoverBackgroundColor: '#fff', // Background color of the points when hovered
          pointHoverBorderColor: 'rgba(54, 162, 235, 1)' // Border color of the points when hovered
      }
  ]
};
/*--------------------------------------*/
  this.service.getTransformateurAndItsPvs().subscribe({
    next : (Response) =>
    {
      this.list=Response;
      this.originalList = this.list;
    }
  })
  }

  Search() {
    if (this.searchkey.trim() !== '') {
        // Filter the list based on the searchkey
        this.list = this.list.filter(item =>
            Object.values(item).some(val =>
                val !== null && val.toString().toLowerCase().includes(this.searchkey.toLowerCase())
            )
        );
        console.log(this.list);
    }
}


Search2() {
  if (this.searchkey.trim() !== '') {
      // Filter the list based on the searchkey
      this.Etape = this.Etape.filter(item =>
          Object.values(item).some(val =>
              val !== null && val.toString().toLowerCase().includes(this.searchkey.toLowerCase())
          )
      );
      console.log(this.list);
  }
}

ResetList2() {
  // Reset the list to its original state
  this.Etape = this.originalEtape;
  this.searchkey = '';
}

ResetList() {
  // Reset the list to its original state
  this.list = this.originalList;
  this.searchkey = '';
}


Production_Progress : number = 0
Resultat_de_Production(etapes : Etape[])
{
  const conformeEtapes = etapes.filter(etape => etape.resultat !== "Non conforme" && etape.resultat !== "En Attente").length;
  this.Production_Progress = (conformeEtapes / 18) * 100;
  return  this.Production_Progress;
}


getSeverity(resultat: string): string {
  switch (resultat) {
    case 'Conforme':
      return 'success'; // Light green
    case 'danger':
      return '#FFC107'; // Amber
    case 'primary':
      return '#122151'; // Light blue
    default:
      return 'red'; // Default to light blue for unrecognized values
  }

}

visible = false;
show()
{
  this.visible=!this.visible;
}


Bobinage : Bobinage[] = [];
BobinageMT : BobinageMT[] = [];
Magnetique : Magnetique[] = [];
Montage : Montage[] = [];
Ecuvage : Ecuvage[] = [];
Remplissage : Remplissage[] = [];
Peinture : Peinture[] = [];
Conseption : Conseption[] = [];

Bobinage_Progress : number = 0
BobinageMT_Progress : number = 0
Magnetique_Progress : number = 0
Montage_Progress : number = 0
Ecuvage_Progress : number = 0
Remplissage_Progress : number = 0
Peinture_Progress : number = 0
Conseption_Progress : number = 0
Results(id: number)
{
  this.ServiceE.getEtapesByTransformateurId(id).subscribe({
    next : (Response) =>
    {
      this.Etape = Response;
      this.originalEtape = this.Etape;
    }
  }),
  this.ServiceBobinage.getBobinageByTransformateurId(id).subscribe({
    next: (Response) => {
      this.Bobinage = Response;4
      this.Bobinage_Progress = (this.Bobinage.filter(item => item.cnc === "C").length / 9) * 100;
    }
  });
  this.ServiceBobinageMT.getBobinageByTransformateurId(id).subscribe({
    next: (Response) => {
      this.BobinageMT = Response;
      this.BobinageMT_Progress = (this.BobinageMT.filter(item => item.cnc === "C" ).length / 9) * 100;
    }
  });
  this.ServiceMagnetique.getMagnetiqueByTransformateurId(id).subscribe({
    next: (Response) => {
      this.Magnetique = Response;
      console.log(this.Magnetique)
      this.Magnetique_Progress = (this.Magnetique.filter(item =>
        (item.cnc1 === "C" ) &&
        (item.cnc2 === "C") &&
        (item.cnc3 === "C") &&
        (item.cnc4 === "C")
      ).length / 4) * 100;
      console.log(this.Magnetique_Progress)
          }
  });
  this.ServiceMontage.getMontageByTransformateurId(id).subscribe({
    next: (Response) => {
      this.Montage = Response;
      this.Montage_Progress = (this.Montage.filter(item =>
        (item.cnc1 === "C") &&
        (item.cnc2 === "C") &&
        (item.cnc3 === "C")
      ).length / 3) * 100;
          }
  });
  this.ServiceEcuvage.getEcuvageByTransformateurId(id).subscribe({
    next: (Response) => {
      this.Ecuvage = Response;
      this.Ecuvage_Progress = (this.Ecuvage.filter(item =>
        (item.conformite === "Yes")
      ).length / 11) * 100;
          }
  });
  this.ServiceRemplissage.getRemplissagesByTransformateurId(id).subscribe({
    next: (Response) => {
      this.Remplissage = Response;
      this.Remplissage_Progress  = (this.Remplissage.filter(item =>
        (item.cnc === "C")
      ).length ) * 100;
          }
  });
  this.ServicePeinture.getPeintureByTransformateurId(id).subscribe({
    next: (Response) => {
      this.Peinture = Response;
      this.Peinture_Progress = (this.Peinture.filter(item => item.cnc=== "C").length  ) * 100;
    }
  })
  this.ServiceConseption.getConseptionsByTransformateur(id).subscribe({
    next : (Response) =>
     {
      this.Conseption = Response;
      this.Conseption_Progress = (this.Conseption.filter(item => item.conformiter==="Yes").length / 16)*100
     }
  })
}


getSeverity2(resultat: string) {
  if (resultat === "Conforme") {
    return 'success'; // Light green
  } else if (resultat === "Non conforme") {
    return 'danger'; // Amber
  } else if (resultat === "En Attente") {
    return 'primary'; // Light blue
  } else {
    return 'warning';
  }
}




}
