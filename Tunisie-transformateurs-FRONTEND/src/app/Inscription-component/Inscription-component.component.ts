import { Component, OnInit } from '@angular/core';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  constructor(public ServiceC : ControlleurServiceService , public router : Router, public SerivceM : MessageService ) { }

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
            this.SerivceM.add({ severity: 'info', summary: 'Existant', detail: 'Utilisateur existe deja.' });
          } else {
            // Handle other types of errors if needed
            console.error('An error occurred during registration:', error);
          }
        }
      });
    } else {
      this.SerivceM.add({ severity: 'error', summary: 'Champs obligatoires', detail: 'Tous les champs sont obligatoires.' });
    }
  }
  eyeClosed: boolean = true;

  toggleEye() {
    this.eyeClosed = !this.eyeClosed;
  }
}
