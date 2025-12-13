import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../core/services/common/authService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {

    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/login']);
    }

    // Check roles if specified in route data
    const allowedRoles = route.data['roles'] as string[] | undefined;
    const userRole = this.authService.getRole();

    if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
      // User role not allowed: redirect to login page
      return this.router.createUrlTree(['/login']); 
    }

    return true; // authorized
  }
}
