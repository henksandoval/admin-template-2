import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavigationItem, NavigationService } from '@layout/services/navigation/navigation.service';

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './sidebar-menu-item.component.html'
})
export class SidebarMenuItemComponent {
  @Input() item!: NavigationItem;

  public navigationService = inject(NavigationService);

  getPaddingClass(level: number): string {
    switch (level) {
      case 1: return 'pl-0';      // 0px
      case 2: return 'pl-3';      // 12px
      case 3: return 'pl-6';      // 24px
      default: return 'pl-0';
    }
  }

  getIconSizeClass(level: number): string {
    switch (level) {
      case 1: return 'text-xl';   // 20px
      case 2: return 'text-lg';   // 18px
      case 3: return 'text-base'; // 16px
      default: return 'text-base';
    }
  }

  getCursorClass(hasRoute: boolean): string {
    return hasRoute ? 'cursor-pointer' : 'cursor-default';
  }

  getItemClasses(item: NavigationItem): string {
    const isActive = item.route && this.navigationService.isActiveRoute(item.route.substring(1));
    const level = item.level || 1;

    let baseClasses = 'transition-all duration-200';
    let stateClasses = '';

    if (isActive) {
      stateClasses = 'bg-primary bg-opacity-10 border-l-4 border-primary';
    }

    return `${baseClasses} ${stateClasses}`;
  }

  getIconClasses(item: NavigationItem): string {
    const isActive = item.route && this.navigationService.isActiveRoute(item.route.substring(1));
    const level = item.level || 1;

    let baseClasses = 'transition-colors duration-200';
    let colorClasses = '';

    if (isActive) {
      colorClasses = 'text-primary';
    } else {
      switch (level) {
        case 1:
          colorClasses = 'text-on-surface-variant';
          break;
        case 2:
          colorClasses = 'text-on-surface-variant opacity-80';
          break;
        case 3:
          colorClasses = 'text-on-surface-variant opacity-70';
          break;
        default:
          colorClasses = 'text-on-surface-variant';
      }
    }

    return `${baseClasses} ${colorClasses}`;
  }

  getTextClasses(item: NavigationItem): string {
    const isActive = item.route && this.navigationService.isActiveRoute(item.route.substring(1));
    const level = item.level || 1;

    let baseClasses = '';
    let colorClasses = '';

    switch (level) {
      case 1:
        baseClasses = 'text-sm font-semibold';
        break;
      case 2:
        baseClasses = 'text-sm font-medium';
        break;
      case 3:
        baseClasses = 'text-xs font-medium';
        break;
      default:
        baseClasses = 'text-sm font-medium';
    }

    if (isActive) {
      colorClasses = 'text-on-surface';
    } else {
      switch (level) {
        case 1:
          colorClasses = 'text-on-surface';
          break;
        case 2:
          colorClasses = 'text-on-surface-variant';
          break;
        case 3:
          colorClasses = 'text-on-surface-variant';
          break;
        default:
          colorClasses = 'text-on-surface-variant';
      }
    }

    return `${baseClasses} ${colorClasses}`;
  }
}
