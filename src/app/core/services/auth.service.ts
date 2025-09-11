import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError, delay, map } from 'rxjs';
import { User, LoginCredentials, LoginResponse } from '@core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  
  private router = inject(Router);
  
  // Reactive state using signals
  private _currentUser = signal<User | null>(null);
  private _isLoading = signal<boolean>(false);
  
  // Public computed properties
  currentUser = this._currentUser.asReadonly();
  isAuthenticated = computed(() => !!this._currentUser());
  isLoading = this._isLoading.asReadonly();
  
  constructor() {
    this.loadStoredAuthData();
  }
  
  /**
   * Simulate login API call - Replace with real HTTP call in production
   */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    this._isLoading.set(true);
    
    // Simulate API delay and validation
    return of(null).pipe(
      delay(1500), // Simulate network delay
      map(() => {
        // Mock validation
        if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
          const mockUser: User = {
            id: '1',
            email: credentials.email,
            name: 'Admin User',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
          };
          
          const mockResponse: LoginResponse = {
            user: mockUser,
            token: 'mock_jwt_token_' + Date.now(),
            expiresIn: 3600 // 1 hour
          };
          
          this.setAuthData(mockResponse);
          this._isLoading.set(false);
          return mockResponse;
        } else {
          this._isLoading.set(false);
          throw new Error('Invalid credentials');
        }
      })
    );
  }
  
  /**
   * Logout user and clear all stored data
   */
  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/login']);
  }
  
  /**
   * Store authentication data securely
   */
  private setAuthData(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    this._currentUser.set(response.user);
  }
  
  /**
   * Clear all authentication data
   */
  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._currentUser.set(null);
  }
  
  /**
   * Load stored authentication data on app initialization
   */
  private loadStoredAuthData(): void {
    try {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const userJson = localStorage.getItem(this.USER_KEY);
      
      if (token && userJson) {
        const user: User = JSON.parse(userJson);
        this._currentUser.set(user);
      }
    } catch (error) {
      console.error('Error loading stored auth data:', error);
      this.clearAuthData();
    }
  }
  
  /**
   * Get the current auth token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  /**
   * Check if user session is valid
   */
  isValidSession(): boolean {
    const token = this.getToken();
    const user = this._currentUser();
    
    // In production, you would validate the JWT token here
    return !!(token && user);
  }
}