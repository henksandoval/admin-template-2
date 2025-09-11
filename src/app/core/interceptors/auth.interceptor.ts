import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

/**
 * Functional HTTP interceptor to handle authentication tokens and errors
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Clone the request and add authorization header if token exists
  let authReq = req;
  const token = authService.getToken();
  
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized responses
      if (error.status === 401 && authService.isAuthenticated()) {
        console.warn('Session expired, logging out user');
        authService.logout();
      }
      
      return throwError(() => error);
    })
  );
};