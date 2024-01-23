import { Component, OnInit } from '@angular/core';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-CreateAcount-component',
  templateUrl: './CreateAcount-component.component.html',
  styleUrls: ['./CreateAcount-component.component.css']
})
export class CreateAcountComponentComponent implements OnInit {

  Controleur :ControleurDeQualite =
  {
    idC: 'test',
    email: '',
    password: ''
  };

  constructor(public ServiceC : ControlleurServiceService , private router: Router) { }

  ngOnInit() {
  }

  ValidateInputs()
  {
    return this.Controleur.idC!==undefined || this.Controleur.email!==undefined || this.Controleur.password!==undefined
  }
  Login() {
    if (this.ValidateInputs()) {
      this.ServiceC.getControleur(this.Controleur.idC).subscribe({
        next: () => {
            this.router.navigate(['/Edit_profile']);
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
