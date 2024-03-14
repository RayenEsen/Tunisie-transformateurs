import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from '../utils/session-service.service'; // Adjust the path based on your project structure

@Injectable({
  providedIn: 'root',
})
export class AdministrationOnlyGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const protectedRoutes: string[] = ['/Utilisateurs','/DashBoard'];

    // Check if the user is authenticated and is an administrator
    const isAuthenticated: boolean = this.sessionService.hasSession();
    const isAdmin: boolean = this.sessionService.Controleur.designation==="Administrateur"; // Adjust this method based on your session service

    if (protectedRoutes.includes(state.url) && (!isAuthenticated || !isAdmin)) {
      this.router.navigate(['/']); // Change '/Sign_up' to the actual login page route
    }

    return true;
  }
}
