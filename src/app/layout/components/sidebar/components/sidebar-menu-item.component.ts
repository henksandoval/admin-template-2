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
  templateUrl: './sidebar-menu-item.component.html',
  styleUrl: './sidebar-menu-item.component.scss'
})
export class SidebarMenuItemComponent {
  @Input() item!: NavigationItem;

  public navigationService = inject(NavigationService);

  // Icon mapping from filled to outlined versions where available
  private iconMap: Record<string, string> = {
    'dashboard': 'dashboard',
    'people': 'people_outline', 
    'visibility': 'visibility_outlined',
    'dashboard_customize': 'dashboard_customize',
    'settings': 'settings',
    'account_circle': 'account_circle',
    'notifications': 'notifications_outlined',
    'search': 'search',
    'menu': 'menu',
    'home': 'home',
    'chevron_right': 'chevron_right',
    // Keep other icons as-is since they don't have reliable outlined versions
    'edit_note': 'edit_note',
    'radio_button_checked': 'radio_button_checked',
    'check_box': 'check_box',
    'smart_button': 'smart_button', 
    'label': 'label',
    'tune': 'tune',
    'progress_activity': 'progress_activity',
    'expand_more': 'expand_more',
    'tab': 'tab',
    'list': 'list',
    'touch_app': 'touch_app',
    'palette': 'palette',
    'credit_card': 'credit_card',
    'table_view': 'table_view',
    'view_quilt': 'view_quilt',
    'layers': 'layers'
  };

  getItemClasses(item: NavigationItem): string {
    const isActive = item.route && this.navigationService.isActiveRoute(item.route.substring(1));
    return isActive ? 'active' : '';
  }

  getIconClasses(item: NavigationItem): string {
    const isActive = item.route && this.navigationService.isActiveRoute(item.route.substring(1));
    return isActive ? 'menu-icon active' : 'menu-icon inactive';
  }

  getTextClasses(item: NavigationItem): string {
    const isActive = item.route && this.navigationService.isActiveRoute(item.route.substring(1));
    return isActive ? 'menu-text active' : 'menu-text inactive';
  }

  getOutlineIcon(iconName?: string): string {
    if (!iconName) return '';
    
    // Return outlined version if available, otherwise return original
    return this.iconMap[iconName] || iconName;
  }
}
