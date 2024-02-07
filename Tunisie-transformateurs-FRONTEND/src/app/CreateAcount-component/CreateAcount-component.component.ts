import { Component, OnInit } from '@angular/core';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { Router } from '@angular/router';
import { SessionService } from '../utils/session-service.service';
@Component({
  selector: 'app-CreateAcount-component',
  templateUrl: './CreateAcount-component.component.html',
  styleUrls: ['./CreateAcount-component.component.css']
})
export class CreateAcountComponentComponent implements OnInit {

  Controleur :ControleurDeQualite =
  {
    idC: '',
    email: '',
    password: ''
  };

  constructor(public ServiceC : ControlleurServiceService , private router: Router , public ServiceS : SessionService) { }

  ngOnInit() {
  }

  ValidateInputs() {
    return (this.Controleur.idC !== '') && this.Controleur.email !== '' && this.Controleur.password !== '';
  }

  Login() {
    if (this.ValidateInputs()) {
      this.ServiceC.getControleur(this.Controleur.idC, this.Controleur.password, this.Controleur.email).subscribe({
        next: (userExists) => {
          if (userExists) {
            // User exists, start the session and navigate to Edit_profile
            this.ServiceS.sessionStart(this.Controleur);
            this.router.navigate(['/Edit_profile']);
          } else {
            // User not found
            alert("Utilisateur non trouvé");
          }
        },
        error: (error) => {
          if (error.status === 404) {
            alert("Utilisateur non trouvé");
          } else {
            // Handle other types of errors if needed
            console.error('An error occurred:', error);
          }
        }
      });
    } else {
      alert("Toutes les entrées sont obligatoires.");
    }
  }

}
