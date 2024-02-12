import { Injectable } from '@angular/core';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { Router } from '@angular/router'; // Import Router

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly SESSION_KEY = 'controleurData';
  constructor(private router: Router) {}

  get Controleur(): ControleurDeQualite {
    const storedData = sessionStorage.getItem(this.SESSION_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }

  set Controleur(value: ControleurDeQualite) {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(value));
  }

  sessionStart(controleur: ControleurDeQualite) {
    this.Controleur = controleur;
  }

  sessionDestroy() {
    sessionStorage.removeItem(this.SESSION_KEY);
    this.router.navigate(['/login']);
  }

  hasSession(): boolean {
    return this.Controleur !== null;
  }
}
