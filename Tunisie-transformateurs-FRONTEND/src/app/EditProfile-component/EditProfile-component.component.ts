import { Component, OnInit } from '@angular/core';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { SessionService } from '../utils/session-service.service';
@Component({
  selector: 'app-EditProfile-component',
  templateUrl: './EditProfile-component.component.html',
  styleUrls: ['./EditProfile-component.component.css']
})
export class EditProfileComponentComponent implements OnInit {


  Controleur: ControleurDeQualite = new ControleurDeQualite;
  Confirm : string = '';
  constructor(public ServiceC : ControlleurServiceService,public ServiceS : SessionService) { }

  ngOnInit() {
      this.ServiceC.getControleurById(this.ServiceS.Controleur.idC)
      .subscribe({
        next: (result: ControleurDeQualite) => {
          // Assuming the result is of type ControleurDeQualite
          this.Controleur = result;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }

  ConfirmPassword(): boolean {
    return this.Confirm === this.Controleur.password;
  }

  Update() {
    if (this.ConfirmPassword()) {
      this.ServiceC.AddControleur(this.Controleur)
        .subscribe({
          next: (response) => {
            // Handle the success response if needed
            console.log('Controleur added successfully:', response);
          },
          error: (error) => {
            // Handle the error
            console.error('Error adding Controleur:', error);
          }
        });
    } else {
      console.error('Password confirmation failed');
      // You may want to show a message or take other actions here
    }
  }

}
