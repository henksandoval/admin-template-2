import { Injectable, signal, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationItem } from '@layout/services/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // Signals para el estado del layout
  private _isDarkTheme = signal(false);
  private _currentRoute = signal('');

  // Computed signals para información derivada
  readonly currentPageTitle = computed(() => {
    const route = this._currentRoute();
    if (route.includes('dashboard')) {
      return 'Dashboard';
    } else if (route.includes('showcase')) {
      return 'Components Showcase';
    }
    return 'Dashboard';
  });

  constructor(private router: Router) {
    this.initializeTheme();
    this.listenToRouteChanges();
  }

  // Navegación
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this._isDarkTheme.set(savedTheme === 'dark');
    } else {
      this._isDarkTheme.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }

  private listenToRouteChanges() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this._currentRoute.set(event.url);
    });
  }
}
