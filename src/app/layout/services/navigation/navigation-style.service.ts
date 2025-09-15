import { inject, Injectable } from '@angular/core';
import { NavigationItem, NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationStyleService {
  private navigationService = inject(NavigationService);

  private isActive(item: NavigationItem): boolean {
    return !!item.route && this.navigationService.isActiveRoute(item.route.substring(1));
  }

  public getItemClasses(item: NavigationItem): string {
    return this.isActive(item) ? 'active' : '';
  }

  public getIconClasses(item: NavigationItem): string {
    const activeClass = this.isActive(item) ? 'active menu-icon-active' : 'inactive menu-icon-inactive';
    const levelClass = `menu-icon-level-${item.level || 1}`;
    return `${activeClass} ${levelClass}`;
  }

  public getTextClasses(item: NavigationItem): string {
    const activeClass = this.isActive(item) ? 'active menu-text-active' : 'inactive menu-text-inactive';
    const levelClass = `menu-text-level-${item.level || 1}`;
    return `${activeClass} ${levelClass}`;
  }
}
