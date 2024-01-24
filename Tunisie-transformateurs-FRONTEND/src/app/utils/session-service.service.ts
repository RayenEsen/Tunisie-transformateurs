import { Injectable } from '@angular/core';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly SESSION_KEY = 'controleurData';

  get Controleur(): ControleurDeQualite {
    const storedData = sessionStorage.getItem(this.SESSION_KEY);
    return storedData ? JSON.parse(storedData) : { idC: '', email: '', password: '' };
  }

  set Controleur(value: ControleurDeQualite) {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(value));
  }

  sessionStart(idC: string, email: string, password: string) {
    this.Controleur = { idC, email, password };
  }

  sessionDestroy() {
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  hasSession(): boolean {
    // Check if the idC property is not an empty string
    return this.Controleur.idC !== '';
  }
}
