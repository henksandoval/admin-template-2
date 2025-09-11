import { Injectable } from '@angular/core';
import { AppRoute } from '@core/models/app-route.model';
import { NavigationItem } from '@layout/services/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class RouteMenuService {

  generateMenuFromRoutes(routes: AppRoute[], parentPath: string = '', level: number = 1): NavigationItem[] {
    const menuItems: NavigationItem[] = [];

    for (const route of routes) {
      if (route.component && !route.data) {
        if (route.children && route.children.length > 0) {
          menuItems.push(...this.generateMenuFromRoutes(route.children, parentPath, level));
        }
        continue;
      }

      if (!route.data || route.data.hiddenInMenu) {
        continue;
      }

      const fullPath = this.buildFullPath(parentPath, route.path);

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

      if (route.children && route.children.length > 0) {
        const childMenuItems = this.generateMenuFromRoutes(route.children, fullPath, level + 1);
        if (childMenuItems.length > 0) {
          menuItem.children = childMenuItems;
        }
      }

      menuItems.push(menuItem);
    }

    return menuItems.sort((a, b) => {
      const routeA = this.findRouteById(routes, a.id, parentPath);
      const routeB = this.findRouteById(routes, b.id, parentPath);
      const orderA = routeA?.data?.order || 0;
      const orderB = routeB?.data?.order || 0;
      return orderA - orderB;
    });
  }

  generateId(route: AppRoute, fullPath: string): string {
    if (fullPath) {
      return fullPath.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    }
    if (route.path) {
      return route.path.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    }
    return `route-${Math.random().toString(36).substr(2, 9)}`;
  }

  buildFullPath(parentPath: string, currentPath: string | undefined): string {
    if (!currentPath || currentPath === '') {
      return parentPath;
    }

    if (parentPath === '') {
      return currentPath;
    }

    return `${parentPath}/${currentPath}`;
  }

  findRouteById(routes: AppRoute[], id: string, parentPath: string): AppRoute | undefined {
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

}