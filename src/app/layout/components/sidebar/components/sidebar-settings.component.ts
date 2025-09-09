import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import {NavigationService} from '@layout/services/navigation/navigation.service';

@Component({
  selector: 'app-sidebar-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule
  ],
  template: `
    <mat-divider class="border-opacity-20 border-gray-300 dark:border-gray-600"></mat-divider>

    <div class="py-2" *ngIf="!navigationService.isSidebarCollapsed()">
      <div class="px-3 py-2">
        <h3 class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
          Settings
        </h3>
      </div>

      <div class="px-2 space-y-1">
        <div class="rounded-lg hover:bg-surface-variant hover:bg-opacity-10 transition-colors cursor-pointer p-2">
          <div class="flex items-center space-x-3">
            <mat-icon class="text-on-surface-variant text-lg">settings</mat-icon>
            <span class="text-sm font-medium text-on-surface">Preferences</span>
          </div>
        </div>

        <div class="rounded-lg hover:bg-surface-variant hover:bg-opacity-10 transition-colors cursor-pointer p-2">
          <div class="flex items-center space-x-3">
            <mat-icon class="text-red-600 text-lg">logout</mat-icon>
            <span class="text-sm font-medium text-on-surface">Logout</span>
          </div>
        </div>
      </div>
    </div>

    <div class="py-2" *ngIf="navigationService.isSidebarCollapsed()">
      <div class="px-2 space-y-1">
        <div class="rounded-lg hover:bg-surface-variant hover:bg-opacity-10 transition-colors cursor-pointer p-2 flex justify-center"
             matTooltip="Preferences"
             matTooltipPosition="right">
          <mat-icon class="text-on-surface-variant text-lg">settings</mat-icon>
        </div>

        <div class="rounded-lg hover:bg-surface-variant hover:bg-opacity-10 transition-colors cursor-pointer p-2 flex justify-center"
             matTooltip="Logout"
             matTooltipPosition="right">
          <mat-icon class="text-red-600 text-lg">logout</mat-icon>
        </div>
      </div>
    </div>
  `
})
export class SidebarSettingsComponent {
  public navigationService = inject(NavigationService);
}
