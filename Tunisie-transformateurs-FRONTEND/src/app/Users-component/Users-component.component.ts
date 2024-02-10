import { Component, OnInit } from '@angular/core';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model'
import { ControleComponentComponent } from '../Controle-component/Controle-component.component'
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';


@Component({
  selector: 'app-Users-component',
  templateUrl: './Users-component.component.html',
  styleUrls: ['./Users-component.component.css']
})
export class UsersComponentComponent implements OnInit {

  list : ControleurDeQualite[] = [];
  UserSelected: ControleurDeQualite | null = null;
  keyword: string = "";
  constructor(public ServiceC : ControlleurServiceService) { }

  ngOnInit(): void {
    this.ServiceC.getAllControleurs().subscribe({
      next: (data) => {
        this.list=data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getControllerById(id : string)
  {
    this.ServiceC.getControleurById(id).subscribe({
      next: (data) => {
        this.UserSelected=data;
      }
    });
  }

  Update(id: string, User: ControleurDeQualite) {
    this.ServiceC.UpdateControleurById(id, User)
      .subscribe({
        next: (response) => {
          // Find the controlleur in the list array that matches the id
          let controlleur = this.list.find(c => c.idC === id);
          if (controlleur) {
            // Update the properties of the existing controlleur object
            Object.assign(controlleur, response);
            console.log('Controleur updated successfully:', response);
            alert('Les informations de la Controleur ont été enregistrées');
          } else {
            console.error('Controleur not found for id:', id);
          }
        },
        error: (error) => {
          // Handle the error
          console.error('Error updating Controleur:', error);
        }
      });
  }


  Supprimer(id: string) {
    this.ServiceC.RemoveControleur(id).subscribe({
      next: (response) => {
        // Remove the deleted controleur from the list
        this.list = this.list.filter(c => c.idC !== id);
        console.log(`${this.UserSelected?.username} has been deleted successfully`);
      },
      error: (error) => {
        console.error('Error deleting Controleur:', error);
      }
    });
  }

  search(keyword : string)
  {
    this.ServiceC.SearchControlleurs(keyword).subscribe({
      next: (response) =>
      {
        this.list=response;
      }
    })
  }


}
