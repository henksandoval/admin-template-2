import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationService} from '@layout/services/navigation/navigation.service';

@Component({
  selector: 'app-sidebar-footer',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div class="mt-auto border-t border-opacity-20 border-gray-300 dark:border-gray-600">
      <div class="p-3" *ngIf="!layoutService.isSidebarCollapsed()">
        <div class="text-center">
          <div class="text-xs font-semibold text-on-surface-variant mb-1">Admin Template</div>
          <div class="text-xs text-on-surface-variant opacity-70">v1.0.0</div>
        </div>
      </div>

      <div class="p-2 flex justify-center" *ngIf="layoutService.isSidebarCollapsed()">
        <div class="text-xs text-on-surface-variant opacity-70 transform rotate-90 whitespace-nowrap">v1.0</div>
      </div>
    </div>
  `
})
export class SidebarFooterComponent {
  constructor(public layoutService: NavigationService) {}
}
