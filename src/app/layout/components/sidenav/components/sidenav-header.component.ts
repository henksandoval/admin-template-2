import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {NavigationService} from '@layout/services/navigation/navigation.service';

@Component({
  selector: 'app-sidenav-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  template: `
    <div>
      <h3 *ngIf="!navigationService.isSidebarCollapsed()" class="text-xs">
        Navigation
      </h3>
      <button (click)="navigationService.toggleSidebarCollapsed()"
              [attr.aria-label]="navigationService.isSidebarCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'">
        <mat-icon>
          {{ navigationService.isSidebarCollapsed() ? 'menu_open' : 'menu' }}
        </mat-icon>
      </button>
    </div>
  `,
})
export class SidenavHeaderComponent {
  public navigationService = inject(NavigationService);
}
