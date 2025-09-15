import { Component, Input, inject } from '@angular/core';
import { NavigationStyleService } from '@layout/services/navigation/navigation-style.service';
import {NavigationItem, NavigationService} from '@layout/services/navigation/navigation.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatListItem, MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-sidenav-menu-item',
  imports: [
    NgClass,
    RouterLink,
    MatIcon,
    NgIf,
    NgForOf,
    MatListItem,
    MatNavList
  ],
  template: `
    <a mat-list-item
       *ngIf="!item.children"
       [routerLink]="item.route"
       [ngClass]="styleService.getItemClasses(item)"
       class="menu-item-link"
       [class.level-1]="(item.level || 1) === 1"
       [class.level-2]="(item.level || 1) === 2"
       [class.level-3]="(item.level || 1) === 3">

      <mat-icon matListItemIcon [ngClass]="styleService.getIconClasses(item)">{{ item.icon }}</mat-icon>
      <span matListItemTitle [ngClass]="styleService.getTextClasses(item)">{{ item.label }}</span>
    </a>

    <div *ngIf="item.children" class="expandable-container">
      <div mat-list-item
           (click)="navigationService.toggleMenuItem(item.id)"
           [ngClass]="styleService.getItemClasses(item)"
           class="menu-item-expandable"
           [class.level-1]="(item.level || 1) === 1">

        <mat-icon [ngClass]="styleService.getIconClasses(item)">{{ item.icon }}</mat-icon>
        <span [ngClass]="styleService.getTextClasses(item)">{{ item.label }}</span>
        <mat-icon class="expand-icon" [class.expanded]="navigationService.isMenuExpanded(item.id)">
          chevron_right
        </mat-icon>
      </div>

      <mat-nav-list *ngIf="navigationService.isMenuExpanded(item.id)" class="submenu">
        <app-sidenav-menu-item *ngFor="let subItem of item.children" [item]="subItem"></app-sidenav-menu-item>
      </mat-nav-list>
    </div>
  `
})
export class SidenavMenuItemComponent {
  @Input() item!: NavigationItem;

  public navigationService = inject(NavigationService);
  public styleService = inject(NavigationStyleService);
}
