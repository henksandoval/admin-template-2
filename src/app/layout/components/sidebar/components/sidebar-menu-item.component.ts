import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {LayoutService, NavigationItem} from '@layout/services/layout.service';

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  template: `
    <div class="mb-1">
      <div *ngIf="!item.children"
           (click)="item.route && layoutService.navigateTo(item.route)"
           [class]="getItemClasses(item)"
           class="rounded-lg transition-all duration-200 cursor-pointer p-2 group hover:bg-surface-variant hover:bg-opacity-10">

        <div class="flex items-center space-x-3" [style.padding-left.px]="getExtraPadding(item.level || 1)">
          <mat-icon [class]="getIconClasses(item)" [style.font-size.px]="getIconSize(item.level || 1)">
            {{ item.icon }}
          </mat-icon>

          <span [class]="getTextClasses(item)">{{ item.label }}</span>
        </div>
      </div>

      <div *ngIf="item.children">
        <div (click)="layoutService.toggleMenuItem(item.id)"
             [class]="getItemClasses(item)"
             class="rounded-lg transition-all duration-200 cursor-pointer p-2 group hover:bg-surface-variant hover:bg-opacity-10">

          <div class="flex items-center justify-between" [style.padding-left.px]="getExtraPadding(item.level || 1)">
            <div class="flex items-center space-x-3">
              <mat-icon [class]="getIconClasses(item)" [style.font-size.px]="getIconSize(item.level || 1)">
                {{ item.icon }}
              </mat-icon>

              <span [class]="getTextClasses(item)">{{ item.label }}</span>
            </div>

            <mat-icon class="text-on-surface-variant transition-transform duration-200 text-lg"
                     [class.rotate-90]="layoutService.isMenuExpanded(item.id)">
              chevron_right
            </mat-icon>
          </div>
        </div>

        <div *ngIf="layoutService.isMenuExpanded(item.id)"
             class="overflow-hidden transition-all duration-300 ease-in-out">
          <div class="space-y-1">
            <div *ngFor="let subItem of item.children">
              <app-sidebar-menu-item [item]="subItem"></app-sidebar-menu-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SidebarMenuItemComponent {
  @Input() item!: NavigationItem;

  constructor(public layoutService: LayoutService) {}

  getExtraPadding(level: number): number {
    return (level - 1) * 12;
  }

  getIconSize(level: number): number {
    switch (level) {
      case 1: return 20;
      case 2: return 18;
      case 3: return 16;
      default: return 16;
    }
  }

  getItemClasses(item: NavigationItem): string {
    const isActive = item.route && this.layoutService.isActiveRoute(item.route.substring(1));
    const level = item.level || 1;

    let baseClasses = 'transition-all duration-200';
    let stateClasses = '';

    if (isActive) {
      stateClasses = 'bg-primary bg-opacity-10 border-l-4 border-primary';
    }

    return `${baseClasses} ${stateClasses}`;
  }

  getIconClasses(item: NavigationItem): string {
    const isActive = item.route && this.layoutService.isActiveRoute(item.route.substring(1));
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
    const isActive = item.route && this.layoutService.isActiveRoute(item.route.substring(1));
    const level = item.level || 1;

    let baseClasses = '';
    let colorClasses = '';

    // Definir clases base según el nivel
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

    // Definir colores según el estado activo usando tokens Material
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
