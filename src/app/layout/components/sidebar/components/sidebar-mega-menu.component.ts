import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavigationItem, NavigationService } from '@layout/services/navigation/navigation.service';

@Component({
  selector: 'app-sidebar-mega-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  template: `
    <div [style.position]="'fixed'"
         [style.left.px]="position.left"
         [style.top.px]="position.top"
         (mouseenter)="onMegaMenuEnter()"
         (mouseleave)="onMegaMenuLeave()"
         class="mega-menu-content min-w-80 rounded-lg shadow-none border border-opacity-10 border-gray-300 dark:border-gray-600 z-50">
      <div class="p-3 border-b border-opacity-10 border-gray-300 dark:border-gray-600">
        <div class="flex items-center space-x-2">
          <mat-icon [class]="getIconClasses(item)" class="text-lg">{{ item.icon }}</mat-icon>
          <span class="font-semibold text-on-surface">{{ item.label }}</span>
        </div>
      </div>
      <div class="p-2 max-h-96 overflow-y-auto">
        <div *ngFor="let subItem of item.children">
          <ng-container [ngTemplateOutlet]="megaMenuItemTemplate" [ngTemplateOutletContext]="{item: subItem, parentItem: item}"></ng-container>
        </div>
      </div>
    </div>
    <ng-template #megaMenuItemTemplate let-item="item" let-parentItem="parentItem">
      <div class="mb-1">
        <div *ngIf="!item.children"
             (click)="item.route && navigationService.navigateTo(item.route)"
             [class]="getItemClasses(item)"
             class="rounded-md transition-all duration-200 cursor-pointer p-2 hover:bg-surface-variant hover:bg-opacity-10">

          <div class="flex items-center space-x-2">
            <mat-icon [class]="getIconClasses(item)" class="text-base">
              {{ item.icon }}
            </mat-icon>

            <span [class]="getTextClasses(item)" class="text-sm">{{ item.label }}</span>
          </div>
        </div>
        <div *ngIf="item.children">
          <div class="border-l-2 border-surface-variant ml-2">
            <div (click)="toggleMegaMenuGroup(getMegaMenuGroupKey(parentItem?.label || '', item.label), $event)"
                 class="flex items-center justify-between p-2 cursor-pointer hover:bg-surface-variant hover:bg-opacity-10 rounded-lg transition-all duration-200">

              <div class="flex items-center space-x-2">
                <mat-icon [class]="getIconClasses(item)" class="text-base">{{ item.icon }}</mat-icon>
                <span class="font-medium text-on-surface text-sm">{{ item.label }}</span>
              </div>

              <mat-icon class="text-on-surface-variant text-sm transition-transform duration-200"
                        [class.rotate-90]="isMegaMenuGroupExpanded(getMegaMenuGroupKey(parentItem?.label || '', item.label))">
                chevron_right
              </mat-icon>
            </div>

            <div class="ml-6 space-y-1 overflow-hidden transition-all duration-300"
                 [class.max-h-0]="!isMegaMenuGroupExpanded(getMegaMenuGroupKey(parentItem?.label || '', item.label))"
                 [class.max-h-96]="isMegaMenuGroupExpanded(getMegaMenuGroupKey(parentItem?.label || '', item.label))"
                 [class.opacity-0]="!isMegaMenuGroupExpanded(getMegaMenuGroupKey(parentItem?.label || '', item.label))"
                 [class.opacity-100]="isMegaMenuGroupExpanded(getMegaMenuGroupKey(parentItem?.label || '', item.label))">

              <div *ngFor="let subSubItem of item.children"
                   (click)="subSubItem.route && navigationService.navigateTo(subSubItem.route)"
                   [class]="getItemClasses(subSubItem)"
                   class="rounded-md transition-all duration-200 cursor-pointer p-1.5 hover:bg-surface-variant hover:bg-opacity-10">

                <div class="flex items-center space-x-2">
                  <mat-icon [class]="getIconClasses(subSubItem)" class="text-sm">
                    {{ subSubItem.icon }}
                  </mat-icon>

                  <span [class]="getTextClasses(subSubItem)" class="text-xs">{{ subSubItem.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
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
