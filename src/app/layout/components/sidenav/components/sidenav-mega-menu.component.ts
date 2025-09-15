import { Component, Input, inject } from '@angular/core';
import { NavigationStyleService } from '@layout/services/navigation/navigation-style.service';
import {NavigationItem, NavigationService} from '@layout/services/navigation/navigation.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sidenav-mega-menu',
  template: `
    <div class="p-3 border-b border-outline">
      <div class="flex items-center space-x-2">
        <mat-icon [ngClass]="styleService.getIconClasses(item)">{{ item.icon }}</mat-icon>
        <span class="font-semibold text-on-surface">{{ item.label }}</span>
      </div>
    </div>

    <div class="p-2 max-h-96 overflow-y-auto">
      <div *ngFor="let subItem of item.children" class="mega-menu-item level-2">
        <a *ngIf="!subItem.children" [routerLink]="subItem.route" class="menu-item-link">
          <mat-icon [ngClass]="styleService.getIconClasses(subItem)">{{ subItem.icon }}</mat-icon>
          <span [ngClass]="styleService.getTextClasses(subItem)">{{ subItem.label }}</span>
        </a>

        <div *ngIf="subItem.children" class="menu-group">
          <div (click)="toggleGroup(subItem.id)" class="menu-group-header">
            <div class="flex items-center">
              <mat-icon [ngClass]="styleService.getIconClasses(subItem)">{{ subItem.icon }}</mat-icon>
              <span [ngClass]="styleService.getTextClasses(subItem)">{{ subItem.label }}</span>
            </div>
            <mat-icon class="expand-icon" [class.expanded]="expandedGroups.has(subItem.id)">
              chevron_right
            </mat-icon>
          </div>
          <div class="menu-group-content" *ngIf="expandedGroups.has(subItem.id)">
            <a *ngFor="let subSubItem of subItem.children" [routerLink]="subSubItem.route"
               class="menu-item-link level-3">
              <mat-icon [ngClass]="styleService.getIconClasses(subSubItem)">{{ subSubItem.icon }}</mat-icon>
              <span [ngClass]="styleService.getTextClasses(subSubItem)">{{ subSubItem.label }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [
    MatIcon,
    NgClass,
    NgForOf,
    NgIf,
    RouterLink
  ],
  styles: [`
    :host {
      display: block; /* El host es el contenedor del menú */
      background: var(--mat-sys-surface-container);
      color: var(--mat-sys-on-surface);
      backdrop-filter: blur(20px);
      border-radius: 0.5rem; /* 8px */
      border: 1px solid var(--mat-sys-outline);
      box-shadow: var(--mat-sys-elevation-level-2); /* Usar sombras de Material */
      min-width: 280px;
    }
  `]
})
export class SidenavMegaMenuComponent {
  @Input() item!: NavigationItem;

  public navigationService = inject(NavigationService);
  public styleService = inject(NavigationStyleService);
  public expandedGroups = new Set<string>();

  toggleGroup(groupKey: string) {
    if (this.expandedGroups.has(groupKey)) {
      this.expandedGroups.delete(groupKey);
    } else {
      this.expandedGroups.add(groupKey);
    }
  }
}
