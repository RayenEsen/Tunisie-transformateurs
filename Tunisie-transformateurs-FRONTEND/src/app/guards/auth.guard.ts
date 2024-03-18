import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from '../utils/session-service.service'; // Adjust the path based on your project structure

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const protectedRoutes: string[] = ['/Transformateur','/Edit_profile','/Add_transformateur','/Ajouter_Transformateur','/Planification','/Bobinage','/BobinageMT','/Magnetique','/Ecuvage','/Livraison','/Montage','/ApresMontage','/Remplissage','/Peinture','/Conseption','/Report'];

    // Check if the user is authenticated or has the necessary credentials
    const isAuthenticated: boolean = this.sessionService.hasSession();

    if (protectedRoutes.includes(state.url) && !isAuthenticated) {
      // Redirect to the login page if the user is not authenticated and trying to access a protected route
      this.router.navigate(['/Sign_in']); // Change '/Sign_up' to the actual login page route
      return false;
    }

    // Additional check for routes with dynamic IDs
    if (state.url.match(/\/\d+$/) && !isAuthenticated) {

      this.router.navigate(['/Sign_in']);
      return false;
    }

    return true;
  }
}
