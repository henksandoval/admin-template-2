import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {OverlayModule, CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition} from '@angular/cdk/overlay';
import { NavigationItem, NavigationService } from '@layout/services/navigation/navigation.service';
import { NavigationStyleService } from '@layout/services/navigation/navigation-style.service';
import { RouterLink } from '@angular/router';
import {SidenavMenuItemComponent} from '@layout/components/sidenav/components/sidenav-menu-item.component';
import {SidenavMegaMenuComponent} from '@layout/components/sidenav/components/sidenav-mega-menu.component';
import {MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-sidenav-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatTooltipModule,
    OverlayModule,
    SidenavMenuItemComponent,
    SidenavMegaMenuComponent,
    MatNavList,
  ],
  template: `
    <div class="sidebar-navigation" [class.collapsed]="navigationService.isSidebarCollapsed()">
      <mat-nav-list *ngIf="!navigationService.isSidebarCollapsed()">
        <app-sidenav-menu-item
          *ngFor="let item of navigationService.navigationItems()"
          [item]="item">
        </app-sidenav-menu-item>
      </mat-nav-list>

      <div *ngIf="navigationService.isSidebarCollapsed()">
        <div *ngFor="let item of navigationService.navigationItems()" class="nav-item">
          <div
            class="nav-icon-container"
            [matTooltip]="item.label"
            matTooltipPosition="right"
            [matTooltipDisabled]="isMenuOpen && activeMenuItem?.id === item.id"
            (mouseenter)="onIconEnter(item, trigger)"
            (mouseleave)="onIconLeave()"
            (click)="onIconClick(item, trigger)"
            [routerLink]="!item.children ? item.route : null"
            [class.cursor-pointer]="!!item.route || !!item.children"
            #trigger="cdkOverlayOrigin"
            cdkOverlayOrigin>
            <mat-icon [ngClass]="styleService.getIconClasses(item)">{{ item.icon }}</mat-icon>
          </div>
        </div>
      </div>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="activeMenuTrigger"
      [cdkConnectedOverlayOpen]="isMenuOpen"
      [cdkConnectedOverlayPositions]="overlayPositions"
      (overlayOutsideClick)="closeMenu()"
      (detach)="closeMenu()">
      <app-sidenav-mega-menu
        *ngIf="activeMenuItem"
        [item]="activeMenuItem"
        (mouseenter)="onMenuEnter()"
        (mouseleave)="onMenuLeave()">
      </app-sidenav-mega-menu>
    </ng-template>
  `,
})
export class SidenavNavigationComponent {
  public navigationService = inject(NavigationService);
  public styleService = inject(NavigationStyleService);

  isMenuOpen = false;
  activeMenuItem: NavigationItem | null = null;
  activeMenuTrigger: CdkOverlayOrigin = null!;
  isMenuPinned = false;
  private closeTimeout: any;

  overlayPositions: ConnectedPosition[] = [
    { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 8 },
    { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -8 }
  ];

  onIconEnter(item: NavigationItem, trigger: CdkOverlayOrigin) {
    if (this.isMenuPinned) return;
    clearTimeout(this.closeTimeout);
    if (item.children) {
      this.activeMenuItem = item;
      this.activeMenuTrigger = trigger;
      this.isMenuOpen = true;
    }
  }

  onIconLeave() {
    if (this.isMenuPinned) return;
    this.scheduleClose();
  }

  onIconClick(item: NavigationItem, trigger: CdkOverlayOrigin) {
    if (item.children) {
      if (this.isMenuOpen && this.isMenuPinned && this.activeMenuItem?.id === item.id) {
        return;
      }

      this.isMenuPinned = true;
      this.activeMenuItem = item;
      this.activeMenuTrigger = trigger;
      this.isMenuOpen = true;
    } else {
      this.closeMenu();
    }
  }

  onMenuEnter() {
    clearTimeout(this.closeTimeout);
  }

  onMenuLeave() {
    if (!this.isMenuPinned) {
      this.scheduleClose();
    }
  }

  scheduleClose() {
    this.closeTimeout = setTimeout(() => {
      this.closeMenu();
    }, 100);
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isMenuPinned = false;
    this.activeMenuItem = null;
  }
}
