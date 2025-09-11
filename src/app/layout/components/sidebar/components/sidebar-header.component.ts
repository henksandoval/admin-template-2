import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {NavigationService} from '@layout/services/navigation/navigation.service';

@Component({
  selector: 'app-sidebar-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  template: `
    <div class="sidebar-header">
      <h3 *ngIf="!navigationService.isSidebarCollapsed()"
          class="navigation-title">
        Navigation
      </h3>
      <button (click)="navigationService.toggleSidebarCollapsed()"
              class="collapse-button"
              [attr.aria-label]="navigationService.isSidebarCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'">
        <mat-icon>
          {{ navigationService.isSidebarCollapsed() ? 'menu_open' : 'menu' }}
        </mat-icon>
      </button>
    </div>
  `,
  styleUrl: './sidebar-header.component.scss'
})
export class SidebarHeaderComponent {
  public navigationService = inject(NavigationService);
}
