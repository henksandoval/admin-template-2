import {computed, inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';

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
      id: 'pds',
      label: 'PDS',
      icon: 'dashboard_customize',
      level: 1,
      children: [
        {
          id: 'components-showcase-pds',
          label: 'Showcase',
          icon: 'visibility',
          route: '/pds',
          level: 2,
          children: [
            {
              id: 'showcase-forms',
              label: 'Form Fields',
              icon: 'edit_note',
              route: '/pds/forms',
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
  private _isSidebarCollapsed = signal(false);
  private _currentRoute = signal('');
  private _expandedMenus = signal<Set<string>>(new Set());
  private _isSidebarVisible = signal(true);
  private _router: Router = inject(Router);

  readonly navigationItems = this._navigationItems.asReadonly();
  readonly isSidebarCollapsed = this._isSidebarCollapsed.asReadonly();

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
