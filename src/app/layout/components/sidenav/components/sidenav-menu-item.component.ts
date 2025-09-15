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
    <!-- Simple menu item without children -->
    <a mat-list-item
       *ngIf="!item.children"
       [routerLink]="item.route"
       [ngClass]="styleService.getItemClasses(item)"
       class="!p-0 !rounded-lg !mb-1 hover:!bg-transparent">

      <div class="flex items-center w-full px-3 py-2">
        <mat-icon [ngClass]="styleService.getIconClasses(item)">{{ item.icon }}</mat-icon>
        <span [ngClass]="styleService.getTextClasses(item)">{{ item.label }}</span>
      </div>
    </a>

    <!-- Expandable menu item with children -->
    <div *ngIf="item.children" class="relative">
      <!-- Parent item -->
      <div mat-list-item
           (click)="navigationService.toggleMenuItem(item.id)"
           [ngClass]="styleService.getItemClasses(item)"
           class="!p-0 !rounded-lg !mb-1 hover:!bg-transparent cursor-pointer">

        <div class="flex items-center w-full px-3 py-2">
          <mat-icon [ngClass]="styleService.getIconClasses(item)">{{ item.icon }}</mat-icon>
          <span [ngClass]="styleService.getTextClasses(item)">{{ item.label }}</span>
          <mat-icon [ngClass]="styleService.getExpandIconClasses(item, navigationService.isMenuExpanded(item.id))">
            chevron_right
          </mat-icon>
        </div>
      </div>

      <!-- Submenu container with connecting lines -->
      <div *ngIf="navigationService.isMenuExpanded(item.id)" 
           class="relative ml-3 border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-1">
        
        <mat-nav-list class="!p-0">
          <div *ngFor="let subItem of item.children; let isLast = last" 
               class="relative">
            
            <!-- Horizontal connecting line -->
            <div class="absolute left-0 top-4 w-3 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-3"></div>
            
            <!-- Remove vertical line for last item -->
            <div *ngIf="!isLast" 
                 class="absolute left-0 top-4 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-3"></div>
            
            <app-sidenav-menu-item [item]="subItem"></app-sidenav-menu-item>
          </div>
        </mat-nav-list>
      </div>
    </div>
  `,
  styles: [`
    /* Override Material Design default styles to ensure Tailwind takes precedence */
    :host ::ng-deep .mat-mdc-list-item {
      --mdc-list-list-item-container-color: transparent !important;
      --mdc-list-list-item-hover-state-layer-color: transparent !important;
      --mdc-list-list-item-focus-state-layer-color: transparent !important;
      --mdc-list-list-item-selected-container-color: transparent !important;
    }
    
    :host ::ng-deep .mat-mdc-list-item .mdc-list-item__content {
      padding: 0 !important;
    }
    
    :host ::ng-deep .mat-mdc-nav-list {
      padding: 0 !important;
    }
  `]
})
export class SidenavMenuItemComponent {
  @Input() item!: NavigationItem;

  public navigationService = inject(NavigationService);
  public styleService = inject(NavigationStyleService);
}
