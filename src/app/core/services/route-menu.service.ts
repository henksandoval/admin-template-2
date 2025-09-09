import { Injectable } from '@angular/core';
import { AppRoute } from '@core/models/app-route.model';
import { NavigationItem } from '@layout/services/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class RouteMenuService {

  /**
   * Generates NavigationItems from AppRoutes configuration
   * @param routes The routes configuration
   * @param parentPath The parent path for building full routes
   * @param level The hierarchy level (defaults to 1)
   * @returns Array of NavigationItems for the menu
   */
  generateMenuFromRoutes(routes: AppRoute[], parentPath: string = '', level: number = 1): NavigationItem[] {
    const menuItems: NavigationItem[] = [];

    for (const route of routes) {
      // Skip layout routes without their own menu data
      if (route.component && !route.data) {
        // Process children of layout routes
        if (route.children && route.children.length > 0) {
          menuItems.push(...this.generateMenuFromRoutes(route.children, parentPath, level));
        }
        continue;
      }

      // Skip routes without menu data or hidden routes
      if (!route.data || route.data.hiddenInMenu) {
        continue;
      }

      // Build the full path
      const fullPath = this.buildFullPath(parentPath, route.path);

      // Generate menu item from route
      const menuItem: NavigationItem = {
        id: this.generateId(route, fullPath),
        label: route.data.label,
        icon: route.data.icon,
        route: fullPath && fullPath !== '' ? `/${fullPath}` : undefined,
        level: route.data.level || level,
        badge: route.data.badge,
        children: undefined,
        expanded: false
      };

      // Process children if they exist
      if (route.children && route.children.length > 0) {
        const childMenuItems = this.generateMenuFromRoutes(route.children, fullPath, level + 1);
        if (childMenuItems.length > 0) {
          menuItem.children = childMenuItems;
        }
      }

      menuItems.push(menuItem);
    }

    // Sort by order if specified, otherwise maintain route order
    return menuItems.sort((a, b) => {
      const routeA = this.findRouteById(routes, a.id, parentPath);
      const routeB = this.findRouteById(routes, b.id, parentPath);
      const orderA = routeA?.data?.order || 0;
      const orderB = routeB?.data?.order || 0;
      return orderA - orderB;
    });
  }

  /**
   * Generates a unique ID for a route based on its path
   */
  private generateId(route: AppRoute, fullPath: string): string {
    if (fullPath) {
      return fullPath.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    }
    if (route.path) {
      return route.path.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    }
    return `route-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Builds the full route path
   */
  private buildFullPath(parentPath: string, currentPath: string | undefined): string {
    if (!currentPath || currentPath === '') {
      return parentPath;
    }

    if (parentPath === '') {
      return currentPath;
    }

    return `${parentPath}/${currentPath}`;
  }

  /**
   * Finds a route by ID in the routes tree
   */
  private findRouteById(routes: AppRoute[], id: string, parentPath: string): AppRoute | undefined {
    for (const route of routes) {
      const fullPath = this.buildFullPath(parentPath, route.path);
      const routeId = this.generateId(route, fullPath);
      
      if (routeId === id) {
        return route;
      }

      if (route.children) {
        const found = this.findRouteById(route.children, id, fullPath);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  /**
   * Finds all routes that should appear in the menu (recursive)
   */
  findMenuRoutes(routes: AppRoute[]): AppRoute[] {
    const menuRoutes: AppRoute[] = [];

    for (const route of routes) {
      if (route.data && !route.data.hiddenInMenu) {
        menuRoutes.push(route);
      }

      if (route.children) {
        menuRoutes.push(...this.findMenuRoutes(route.children));
      }
    }

    return menuRoutes;
  }
}