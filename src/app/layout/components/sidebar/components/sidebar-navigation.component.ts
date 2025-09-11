import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarMenuItemComponent } from './sidebar-menu-item.component';
import { SidebarMegaMenuComponent } from './sidebar-mega-menu.component';
import { NavigationItem, NavigationService } from '@layout/services/navigation/navigation.service';

@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    SidebarMenuItemComponent,
    SidebarMegaMenuComponent
  ],
  template: `
    <div class="sidebar-navigation" *ngIf="!navigationService.isSidebarCollapsed()">
      <div *ngFor="let item of navigationService.navigationItems()" class="nav-item">
        <app-sidebar-menu-item [item]="item"></app-sidebar-menu-item>
      </div>
    </div>

    <div class="sidebar-navigation" *ngIf="navigationService.isSidebarCollapsed()">
      <div *ngFor="let item of navigationService.navigationItems(); let i = index" class="nav-item">
        <div class="nav-item-collapsed">
          <div (mouseenter)="onItemHover(item, i, $event)"
               (mouseleave)="onItemLeave()"
               class="nav-icon-container"
               [matTooltip]="item.label"
               matTooltipPosition="right">

            <mat-icon [class]="getIconClasses(item)">
              {{ item.icon }}
            </mat-icon>

            <app-sidebar-mega-menu
              *ngIf="item.children && showMegaMenu === i"
              [item]="item"
              [position]="megaMenuPosition"
              (megaMenuEnter)="onMegaMenuEnter()"
              (megaMenuLeave)="onMegaMenuLeave()">
            </app-sidebar-mega-menu>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './sidebar-navigation.component.scss'
})
export class SidebarNavigationComponent {
  showMegaMenu: number | null = null;
  megaMenuPosition = { left: 0, top: 0 };
  private megaMenuTimeout: any;

  public navigationService = inject(NavigationService);

  onItemHover(item: NavigationItem, index: number, event: MouseEvent) {
    if (!item.children || !this.navigationService.isSidebarCollapsed()) return;

    clearTimeout(this.megaMenuTimeout);

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    this.megaMenuPosition = {
      left: rect.right + 8,
      top: rect.top
    };

    this.showMegaMenu = index;
  }

  onItemLeave() {
    if (this.navigationService.isSidebarCollapsed()) {
      this.megaMenuTimeout = setTimeout(() => {
        this.showMegaMenu = null;
      }, 100);
    }
  }

  onMegaMenuEnter() {
    clearTimeout(this.megaMenuTimeout);
  }

  onMegaMenuLeave() {
    this.megaMenuTimeout = setTimeout(() => {
      this.showMegaMenu = null;
    }, 100);
  }

  getIconClasses(item: NavigationItem): string {
    const isActive = item.route && this.navigationService.isActiveRoute(item.route.substring(1));
    return isActive ? 'nav-icon active' : 'nav-icon inactive';
  }
}
