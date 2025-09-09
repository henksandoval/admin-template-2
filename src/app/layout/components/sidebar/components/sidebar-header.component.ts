import { Component } from '@angular/core';
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
    <div class="p-3 border-b border-opacity-20 border-gray-300 dark:border-gray-600 flex items-center justify-between">
      <h3 *ngIf="!layoutService.isSidebarCollapsed()"
          class="text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-opacity duration-300">
        Navigation
      </h3>
      <button (click)="layoutService.toggleSidebarCollapsed()"
              class="p-1.5 rounded-md hover:bg-surface-variant hover:bg-opacity-10 transition-colors duration-200"
              [attr.aria-label]="layoutService.isSidebarCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'">
        <mat-icon class="text-on-surface-variant transition-all duration-200">
          {{ layoutService.isSidebarCollapsed() ? 'menu_open' : 'menu' }}
        </mat-icon>
      </button>
    </div>
  `
})
export class SidebarHeaderComponent {
  constructor(public layoutService: NavigationService) {}
}
