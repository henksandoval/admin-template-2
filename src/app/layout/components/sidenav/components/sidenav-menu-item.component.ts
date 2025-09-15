import { Component, Input, inject } from '@angular/core';
import { NavigationStyleService } from '@layout/services/navigation/navigation-style.service';
import {NavigationItem, NavigationService} from '@layout/services/navigation/navigation.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sidenav-menu-item',
  imports: [
    NgClass,
    RouterLink,
    MatIcon,
    NgIf,
    NgForOf
  ],
  template: `
    <div class="menu-item" [ngClass]="styleService.getItemClasses(item)">
      <ng-container *ngIf="!item.children; else expandableItem">
        <a [routerLink]="item.route" class="menu-item-link">
          <div class="menu-item-content" [class]="'level-' + (item.level || 1)">
            <mat-icon [ngClass]="styleService.getIconClasses(item)">{{ item.icon }}</mat-icon>
            <span [ngClass]="styleService.getTextClasses(item)">{{ item.label }}</span>
          </div>
        </a>
      </ng-container>

      <ng-template #expandableItem>
        <div (click)="navigationService.toggleMenuItem(item.id)" class="menu-item-expandable">
          <div class="menu-item-header" [class]="'level-' + (item.level || 1)">
            <div class="menu-item-content">
              <mat-icon [ngClass]="styleService.getIconClasses(item)">{{ item.icon }}</mat-icon>
              <span [ngClass]="styleService.getTextClasses(item)">{{ item.label }}</span>
            </div>
            <mat-icon class="expand-icon" [class.expanded]="navigationService.isMenuExpanded(item.id)">
              chevron_right
            </mat-icon>
          </div>
        </div>

        <div *ngIf="navigationService.isMenuExpanded(item.id)" class="submenu">
          <div *ngFor="let subItem of item.children">
            <app-sidenav-menu-item [item]="subItem"></app-sidenav-menu-item>
          </div>
        </div>
      </ng-template>
    </div>
  `
})
export class SidenavMenuItemComponent {
  @Input() item!: NavigationItem;

  public navigationService = inject(NavigationService);
  public styleService = inject(NavigationStyleService);
}
