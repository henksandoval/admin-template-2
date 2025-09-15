import { Component, Input, inject } from '@angular/core';
import { NavigationStyleService } from '@layout/services/navigation/navigation-style.service';
import {NavigationItem, NavigationService} from '@layout/services/navigation/navigation.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatListItem, MatListSubheaderCssMatStyler, MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-sidenav-mega-menu',
  template: `
    <div class="p-4 border-b border-outline">
      <div class="flex items-center space-x-3">
        <mat-icon [ngClass]="styleService.getIconClasses(item)">{{ item.icon }}</mat-icon>
        <span class="font-semibold text-on-surface text-base">{{ item.label }}</span>
      </div>
    </div>

    <mat-nav-list class="p-2 max-h-96 overflow-y-auto">
      <ng-container *ngFor="let subItem of item.children">

        <a mat-list-item *ngIf="!subItem.children" [routerLink]="subItem.route" [ngClass]="styleService.getItemClasses(subItem)">
          <mat-icon matListItemIcon [ngClass]="styleService.getIconClasses(subItem)">{{ subItem.icon }}</mat-icon>
          <span matListItemTitle [ngClass]="styleService.getTextClasses(subItem)">{{ subItem.label }}</span>
        </a>

        <div *ngIf="subItem.children" class="menu-group">
          <h3 mat-subheader>{{ subItem.label }}</h3>

          <a mat-list-item *ngFor="let subSubItem of subItem.children" [routerLink]="subSubItem.route" [ngClass]="styleService.getItemClasses(subSubItem)">
            <mat-icon matListItemIcon [ngClass]="styleService.getIconClasses(subSubItem)">{{ subSubItem.icon }}</mat-icon>
            <span matListItemTitle [ngClass]="styleService.getTextClasses(subSubItem)">{{ subSubItem.label }}</span>
          </a>
        </div>

      </ng-container>
    </mat-nav-list>
  `,
  imports: [
    MatIcon,
    NgClass,
    NgForOf,
    NgIf,
    RouterLink,
    MatNavList,
    MatListItem,
    MatListSubheaderCssMatStyler
  ],
  styles: [`
    :host {
      display: block;
      background: var(--mat-sys-surface-container);
      color: var(--mat-sys-on-surface);
      backdrop-filter: blur(20px);
      border-radius: 0.5rem;
      border: 1px solid var(--mat-sys-outline);
      box-shadow: var(--mat-sys-elevation-level-2);
      min-width: 280px;
    }
  `]
})
export class SidenavMegaMenuComponent {
  @Input() item!: NavigationItem;

  public navigationService = inject(NavigationService);
  public styleService = inject(NavigationStyleService);
}
