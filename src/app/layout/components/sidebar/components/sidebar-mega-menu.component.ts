import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavigationItem, NavigationService } from '@layout/services/navigation/navigation.service';

@Component({
  selector: 'app-sidebar-mega-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './sidebar-mega-menu.component.html',
  styles: [`
    .mega-menu-content {
      background: var(--mat-sys-surface-container);
      color: var(--mat-sys-on-surface);
      backdrop-filter: blur(20px);
    }
  `]
})
export class SidebarMegaMenuComponent {
  @Input() item!: NavigationItem;
  @Input() position!: { left: number; top: number };
  @Output() megaMenuEnter = new EventEmitter<void>();
  @Output() megaMenuLeave = new EventEmitter<void>();

  private megaMenuExpandedGroups = new Set<string>();

  constructor(public navigationService: NavigationService) {}

  onMegaMenuEnter() {
    this.megaMenuEnter.emit();
  }

  onMegaMenuLeave() {
    this.megaMenuLeave.emit();
  }

  toggleMegaMenuGroup(groupKey: string, event: Event) {
    event.stopPropagation();
    if (this.megaMenuExpandedGroups.has(groupKey)) {
      this.megaMenuExpandedGroups.delete(groupKey);
    } else {
      this.megaMenuExpandedGroups.add(groupKey);
    }
  }

  isMegaMenuGroupExpanded(groupKey: string): boolean {
    return this.megaMenuExpandedGroups.has(groupKey);
  }

  getMegaMenuGroupKey(parentLabel: string, itemLabel: string): string {
    return `${parentLabel}-${itemLabel}`;
  }

  getItemClasses(item: NavigationItem): string {
    const isActive = item.route && this.navigationService.isActiveRoute(item.route.substring(1));
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
