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
  private _expandedMenus = signal<Set<string>>(new Set());
  private _isSidebarCollapsed = signal(false);
  private _isSidebarVisible = signal(true); // Nueva propiedad para show/hide completo

  // Estructura de navegación jerárquica
  private _navigationItems = signal<NavigationItem[]>([
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      level: 1
    },
    {
      id: 'atomic-design',
      label: 'Atomic Design',
      icon: 'science',
      route: '/atomic-design',
      level: 1,
      badge: 'NEW'
    },
    {
      id: 'components',
      label: 'Components',
      icon: 'widgets',
      level: 1,
      children: [
        {
          id: 'components-showcase',
          label: 'Showcase',
          icon: 'visibility',
          route: '/showcase',
          level: 2,
          children: [
            {
              id: 'showcase-forms',
              label: 'Form Fields',
              icon: 'edit_note',
              route: '/showcase/forms',
              level: 3
            },
            {
              id: 'showcase-selections',
              label: 'Selection Controls',
              icon: 'radio_button_checked',
              route: '/showcase/selections',
              level: 3
            },
            {
              id: 'showcase-checkboxes',
              label: 'Checkboxes & Radio',
              icon: 'check_box',
              route: '/showcase/checkboxes',
              level: 3
            },
            {
              id: 'showcase-buttons',
              label: 'Buttons & Toggles',
              icon: 'smart_button',
              route: '/showcase/buttons',
              level: 3
            },
            {
              id: 'showcase-chips',
              label: 'Chips',
              icon: 'label',
              route: '/showcase/chips',
              level: 3
            },
            {
              id: 'showcase-sliders',
              label: 'Sliders',
              icon: 'tune',
              route: '/showcase/sliders',
              level: 3
            },
            {
              id: 'showcase-progress',
              label: 'Progress Indicators',
              icon: 'progress_activity',
              route: '/showcase/progress',
              level: 3
            },
            {
              id: 'showcase-expansion',
              label: 'Expansion Panels',
              icon: 'expand_more',
              route: '/showcase/expansion',
              level: 3
            },
            {
              id: 'showcase-tabs',
              label: 'Tabs',
              icon: 'tab',
              route: '/showcase/tabs',
              level: 3
            },
            {
              id: 'showcase-lists',
              label: 'Lists',
              icon: 'list',
              route: '/showcase/lists',
              level: 3
            },
            {
              id: 'showcase-interactive',
              label: 'Interactive Elements',
              icon: 'touch_app',
              route: '/showcase/interactive',
              level: 3
            },
            {
              id: 'showcase-jobmagnetic',
              label: 'JobMagnetic Variables',
              icon: 'palette',
              route: '/showcase/jobmagnetic',
              level: 3
            }
          ]
        },
        {
          id: 'components-forms',
          label: 'Forms',
          icon: 'description',
          level: 2,
          children: [
            {
              id: 'components-forms-basic',
              label: 'Basic Forms',
              icon: 'edit_note',
              route: '/forms/basic',
              level: 3
            },
            {
              id: 'components-forms-advanced',
              label: 'Advanced Forms',
              icon: 'dynamic_form',
              route: '/forms/advanced',
              level: 3
            },
            {
              id: 'components-forms-validation',
              label: 'Form Validation',
              icon: 'check_circle',
              route: '/forms/validation',
              level: 3
            }
          ]
        },
        {
          id: 'components-tables',
          label: 'Data Tables',
          icon: 'table_chart',
          level: 2,
          children: [
            {
              id: 'components-tables-basic',
              label: 'Basic Table',
              icon: 'grid_on',
              route: '/tables/basic',
              level: 3
            },
            {
              id: 'components-tables-advanced',
              label: 'Advanced Table',
              icon: 'view_list',
              route: '/tables/advanced',
              level: 3
            }
          ]
        }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'people',
      level: 1,
      children: [
        {
          id: 'users-list',
          label: 'Users List',
          icon: 'person',
          route: '/users',
          level: 2
        },
        {
          id: 'users-roles',
          label: 'Roles & Permissions',
          icon: 'admin_panel_settings',
          level: 2,
          children: [
            {
              id: 'users-roles-manage',
              label: 'Manage Roles',
              icon: 'manage_accounts',
              route: '/users/roles',
              level: 3
            },
            {
              id: 'users-permissions',
              label: 'Permissions',
              icon: 'security',
              route: '/users/permissions',
              level: 3
            }
          ]
        },
        {
          id: 'users-profile',
          label: 'User Profile',
          icon: 'account_circle',
          route: '/users/profile',
          level: 2
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'analytics',
      level: 1,
      children: [
        {
          id: 'analytics-overview',
          label: 'Overview',
          icon: 'dashboard',
          route: '/analytics',
          level: 2
        },
        {
          id: 'analytics-reports',
          label: 'Reports',
          icon: 'assessment',
          level: 2,
          children: [
            {
              id: 'analytics-reports-sales',
              label: 'Sales Reports',
              icon: 'trending_up',
              route: '/analytics/reports/sales',
              level: 3
            },
            {
              id: 'analytics-reports-users',
              label: 'User Reports',
              icon: 'group',
              route: '/analytics/reports/users',
              level: 3
            }
          ]
        }
      ]
    }
  ]);

  // Signals públicos (readonly)
  readonly isDarkTheme = this._isDarkTheme.asReadonly();
  readonly currentRoute = this._currentRoute.asReadonly();
  readonly expandedMenus = this._expandedMenus.asReadonly();
  readonly navigationItems = this._navigationItems.asReadonly();
  readonly isSidebarCollapsed = this._isSidebarCollapsed.asReadonly();

  // Computed signals para información derivada
  readonly sidebarWidth = computed(() => {
    if (!this._isSidebarVisible()) return 0; // Si está oculto, ancho = 0
    return this._isSidebarCollapsed() ? 64 : 240; // Si está visible, normal o colapsado
  });

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

  readonly currentPageDescription = computed(() => {
    const route = this._currentRoute();
    if (route.includes('dashboard')) {
      return 'Welcome to your admin dashboard';
    } else if (route.includes('showcase')) {
      return 'Explore Angular Material components with Tailwind styling';
    }
    return 'Welcome to your admin dashboard';
  });

  constructor(private router: Router) {
    this.initializeTheme();
    this.initializeSidebar();
    this.listenToRouteChanges();
  }

  // Métodos para actualizar signals
  setDarkTheme(isDark: boolean) {
    this._isDarkTheme.set(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  toggleTheme() {
    this.setDarkTheme(!this._isDarkTheme());
  }

  updateRoute(route: string) {
    this._currentRoute.set(route);
  }

  // Métodos para manejar sidebar collapse
  setSidebarCollapsed(collapsed: boolean) {
    this._isSidebarCollapsed.set(collapsed);
    localStorage.setItem('sidebarCollapsed', collapsed.toString());
  }

  toggleSidebarCollapsed() {
    const newState = !this._isSidebarCollapsed();
    this.setSidebarCollapsed(newState);
  }

  // Métodos para controlar visibilidad completa del sidebar
  isSidebarVisible = computed(() => this._isSidebarVisible());

  setSidebarVisible(visible: boolean) {
    this._isSidebarVisible.set(visible);
    localStorage.setItem('sidebarVisible', visible.toString());
  }

  toggleSidebarVisible() {
    const newState = !this._isSidebarVisible();
    this.setSidebarVisible(newState);
  }

  // Utility methods
  isActiveRoute(route: string): boolean {
    const currentRoute = this._currentRoute().toLowerCase();
    const targetRoute = route.toLowerCase();

    // Exact match or starts with the route
    return currentRoute === `/${targetRoute}` ||
      currentRoute.startsWith(`/${targetRoute}/`) ||
      (targetRoute === 'dashboard' && (currentRoute === '/' || currentRoute === ''));
  }

  // Navegación
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Métodos para manejar expansión de menús jerárquicos
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

  expandMenuItem(itemId: string) {
    const currentExpanded = this._expandedMenus();
    const newExpanded = new Set(currentExpanded);
    newExpanded.add(itemId);
    this._expandedMenus.set(newExpanded);
  }

  collapseMenuItem(itemId: string) {
    const currentExpanded = this._expandedMenus();
    const newExpanded = new Set(currentExpanded);
    newExpanded.delete(itemId);
    this._expandedMenus.set(newExpanded);
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
