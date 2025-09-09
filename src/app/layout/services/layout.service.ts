import { Injectable, signal, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Interfaces para la navegación jerárquica
export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  children?: NavigationItem[];
  expanded?: boolean;
  level?: number;
  badge?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // Signals para el estado del layout
  private _isDarkTheme = signal(false);
  private _currentRoute = signal('');
  private _isSidebarCollapsed = signal(false);
  private _isSidebarVisible = signal(true); // Nueva propiedad para show/hide completo

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
    this.initializeSidebar();
    this.listenToRouteChanges();
  }

  // Navegación
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Utility method para verificar si una ruta está activa en cualquier nivel
  isRouteActiveInTree(item: NavigationItem): boolean {
    const currentRoute = this._currentRoute();

    // Verificar si la ruta actual coincide con el item
    if (item.route && currentRoute.includes(item.route.substring(1))) {
      return true;
    }

    // Verificar recursivamente en los hijos
    if (item.children) {
      return item.children.some(child => this.isRouteActiveInTree(child));
    }

    return false;
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this._isDarkTheme.set(savedTheme === 'dark');
    } else {
      this._isDarkTheme.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }

  private initializeSidebar() {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed) {
      this._isSidebarCollapsed.set(savedCollapsed === 'true');
    }

    const savedVisible = localStorage.getItem('sidebarVisible');
    if (savedVisible) {
      this._isSidebarVisible.set(savedVisible === 'true');
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
