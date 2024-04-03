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

  list: Transformateur[] = [];
  searchItem: string = '';
  Choix1: string = '';
  Choix2: string = '';

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
    // Check if there is any "En Attente" status
    const enAttente = this.Etape.some(etape => etape.resultat === "En Attente");

    if (enAttente) {
        return "En Attente";
    }

    // Check if all etapes are "Conforme"
    const areAllConforme = this.Etape.every(etape => etape.resultat === "Conforme");

    if (areAllConforme) {
        return "Conforme";
    }

    // Check if there are any non-conforming etapes
    const nonConformes = this.Etape.filter(etape => etape.resultat === "Non conforme");
    const areAllNonConformeTreated = nonConformes.every(etape => etape.traitement === "Oui");

    if (nonConformes.length > 0) {
        if (areAllNonConformeTreated) {
            return "Conforme";
        } else {
            return "Non Conforme";
        }
    }

    // If no "En Attente", "Non conforme", or "Conforme", return "Conforme" by default
    return "Conforme";
}




  Rapport(etape : Etape)
  {
    if(etape.resultat!=='Conforme')
    {
      this.router.navigate(['/Repport/'+etape.numero+'/'+etape.id_Etape]);
    }

  }

  Search2() {
    console.log(this.searchItem)
    if (this.searchItem.trim() !== '') {
        // Filter the list based on the searchkey
        this.list = this.list.filter(item =>
            Object.values(item).some(val =>
                val !== null && val.toString().toLowerCase().includes(this.searchItem.toLowerCase())
            )
        );
        console.log(this.list);
    }
  }



}
