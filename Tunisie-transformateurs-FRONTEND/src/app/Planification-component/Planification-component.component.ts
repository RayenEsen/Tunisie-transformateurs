import { Component, OnInit } from '@angular/core';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { MessageService } from 'primeng/api';
import { TreeNode } from 'primeng/api';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { Router } from '@angular/router';
import { RapportServiceService } from '../Shared/Rapport-service.service';
import { Rapport } from '../Shared/Rapport-service.model';
@Component({
  selector: 'app-Planification-component',
  templateUrl: './Planification-component.component.html',
  styleUrls: ['./Planification-component.component.css']
})
export class PlanificationComponentComponent implements OnInit {

  totalRecords: number = 0;
  list: Transformateur[] = [];
  searchItem: string = '';
  Choix1: string = '';
  Choix2: string = '';
  first: number = 0;
  rows: number = 10;
  listnotpaginated: Transformateur[] = [];
  sidebarVisible : boolean = false;
  Etape : Etape[] = [];

  constructor(public ServiceR : RapportServiceService,private router : Router,public ServiceE : EtapeServiceService,public Service: TransformateurServiceService,public ServiceM : MessageService) { }

  ngOnInit() {
    this.Service.getTransformateurAndItsPvs()
    .subscribe({
      next:(Result : Transformateur[]) =>
      {
        console.log(Result)

        Result = Result.filter(item => item.etat==="Production")
        this.list=Result;
        this.listnotpaginated=Result;
        this.totalRecords = this.list.length;
        this.paginate(); // Paginate data after fetching
      }
    });
  }

  Search()
  {
    this.Service.searchTransformateurs(this.searchItem)
    .subscribe({
      next:(Result : Transformateur[]) =>
      {
        console.log(this.searchItem)
        this.list=Result;
      }
    });
  }

  Results(id: number)
  {
    this.ServiceE.getEtapesByTransformateurId(id).subscribe({
      next : (Response) =>
      {
        this.Etape = Response;
        console.log(this.Etape)
      }
    })
  }

  filtrer()
  {
    this.Service.filter(this.Choix1,this.Choix2)
    .subscribe({
      next:(Result : Transformateur[]) =>
      {
        this.list=Result;
        console.log(Result);
      }
    })
  }


  isDateFinDefault(transformateur: any): boolean {
    return transformateur.dateFin === '0001-01-01T00:00:00';
  }


  saveDateLivraison(transformateur: Transformateur) {
    this.Service.UpdateTransformateur(transformateur.numero, transformateur).subscribe({
      next: (response) => {
        this.ServiceM.add({ severity: 'success', summary: 'Succès', detail: 'Date Livraison mise à jour avec succès' });
      },
      error: (error) => {
        console.error('An error occurred while updating transformateur:', error);
        // Handle error here, show error message to user, etc.
      }
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginate(); // Paginate data when page changes
  }

  paginate() {
    const start = this.first;
    const end = start + this.rows;
    this.list = this.listnotpaginated.slice(start, end); // Slice the data array based on current page and rows per page
  }

  getStyle(Etape: any) {
    if (Etape.resultat === 'En Attente') {
      return { cursor: 'default' };
    } else if (Etape.resultat === 'Conforme') {
      return { cursor: 'default' };
    } else {
      return { cursor: 'pointer' };
    }
  }


  Visible: boolean = false;
  ShowDialog()
  {
    this.Visible = !this.Visible;
  }

  Resultat() {
    const nonConformes = this.Etape.filter(etape => etape.resultat === "Non conforme");

    // Check if all Non conforme etapes are treated
    const areAllNonConformeTreated = nonConformes.every(etape => etape.traitement === "Oui");

    if (areAllNonConformeTreated) {
        return "Conforme";
    } else if (nonConformes.length > 0) {
        return "Non Conforme";
    } else if (this.Etape.every(etape => etape.resultat === "Conforme")) {
        return "Conforme";
    } else {
        return "En Attente";
    }
}



  Rapport(etape : Etape)
  {
    if(etape.resultat!=='Conforme')
    {
      this.router.navigate(['/Repport/'+etape.numero+'/'+etape.id_Etape]);
    }

  }

}
