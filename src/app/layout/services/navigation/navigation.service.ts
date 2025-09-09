import {computed, inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import { RouteMenuService } from '@core/services/route-menu.service';
import { routes } from '../../../app.routes';

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
  providedIn: 'root',
})
export class NavigationService {
  private _routeMenuService = inject(RouteMenuService);
  private _navigationItems = signal<NavigationItem[]>([]);
  private _isSidebarCollapsed = signal(false);
  private _currentRoute = signal('');
  private _expandedMenus = signal<Set<string>>(new Set());
  private _isSidebarVisible = signal(true);
  private _router: Router = inject(Router);

  readonly navigationItems = this._navigationItems.asReadonly();
  readonly isSidebarCollapsed = this._isSidebarCollapsed.asReadonly();

  constructor() {
    this.initializeNavigation();
  }

  private initializeNavigation() {
    // Generate navigation items from routes
    const menuItems = this._routeMenuService.generateMenuFromRoutes(routes);
    this._navigationItems.set(menuItems);
  }

  isActiveRoute(route: string): boolean {
    const currentRoute = this._currentRoute().toLowerCase();
    const targetRoute = route.toLowerCase();

    // Exact match or starts with the route
    return currentRoute === `/${targetRoute}` ||
      currentRoute.startsWith(`/${targetRoute}/`) ||
      (targetRoute === 'dashboard' && (currentRoute === '/' || currentRoute === ''));
  }

  readonly sidebarWidth = computed(() => {
    if (!this._isSidebarVisible()) return 0; // Si está oculto, ancho = 0
    return this._isSidebarCollapsed() ? 64 : 240; // Si está visible, normal o colapsado
  });

  isSidebarVisible = computed(() => this._isSidebarVisible());

  setSidebarVisible(visible: boolean) {
    this._isSidebarVisible.set(visible);
    localStorage.setItem('sidebarVisible', visible.toString());
  }

  toggleSidebarVisible() {
    const newState = !this._isSidebarVisible();
    this.setSidebarVisible(newState);
  }

  toggleSidebarCollapsed() {
    const newState = !this._isSidebarCollapsed();
    this.setSidebarCollapsed(newState);
  }

  setSidebarCollapsed(collapsed: boolean) {
    this._isSidebarCollapsed.set(collapsed);
    localStorage.setItem('sidebarCollapsed', collapsed.toString());
  }

  toggleMenuItem(itemId: string) {
    const currentExpanded = this._expandedMenus();
    const newExpanded = new Set(currentExpanded);

    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }

    this._expandedMenus.set(newExpanded);
  }

  isMenuExpanded(itemId: string): boolean {
    return this._expandedMenus().has(itemId);
  }

  navigateTo(route: string) {
    this._router.navigate([route]);
  }
}
