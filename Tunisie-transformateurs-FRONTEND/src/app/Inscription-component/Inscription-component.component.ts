import { Component, OnInit } from '@angular/core';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Inscription-component',
  templateUrl: './Inscription-component.component.html',
  styleUrls: ['./Inscription-component.component.css']
})
export class InscriptionComponentComponent implements OnInit {

  Controleur : ControleurDeQualite =
  {
    idC: '',
    email: '',
    password: '',
    tel: '',
    prenom: '',
    nom:''

  }
  constructor(public ServiceC : ControlleurServiceService , public router : Router ) { }

  ngOnInit() {
  }

  ValidateInputs() {
    return (this.Controleur.idC !== '') && this.Controleur.email !== '' && this.Controleur.password !== '' && this.Controleur.nom !== '' && this.Controleur.prenom !== '' && this.Controleur.tel !== '';
  }

  Inscription() {
    if (this.ValidateInputs()) {
      this.ServiceC.AddControleur(this.Controleur).subscribe({
        next: () => {
            // User registration successful, navigate to the desired page (e.g., profile page)
            this.router.navigate(['/Sign_in']);
        },
        error: (error) => {
          if (error.status === 409) {
            // Duplicate entry (conflict), user already exists
            alert("L'utilisateur existe déjà.");
            this.router.navigate(['/Sign_in']);
          } else {
            // Handle other types of errors if needed
            console.error('An error occurred during registration:', error);
          }
        }
      });
    } else {
      alert("Toutes les entrées sont obligatoires.");
    }
  }
}
