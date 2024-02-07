import { Injectable } from '@angular/core';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly SESSION_KEY = 'controleurData';

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
  }

  hasSession(): boolean {
    return this.Controleur !== null;
  }
}
