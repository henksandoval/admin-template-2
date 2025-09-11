import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

/**
 * Functional guard to protect routes that require authentication
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  // Store the attempted URL for redirecting after login
  const redirectUrl = state.url;
  
  // Redirect to login page with the return URL
  return router.createUrlTree(['/login'], { 
    queryParams: { returnUrl: redirectUrl } 
  });
};