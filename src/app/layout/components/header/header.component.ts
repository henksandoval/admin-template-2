import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {ThemeSelectorComponent} from '@layout/components/theme-selector/theme-selector.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    ThemeSelectorComponent,
  ],
  template: `
    <mat-toolbar color="primary" class="shadow-md z-50 flex-shrink-0 !h-16">
      <div class="flex items-center justify-between w-full">

        <div class="flex items-center flex-shrink-0">
          <button
            mat-icon-button
            (click)="onMenuToggle()"
            class="mr-3 transition-transform hover:scale-110">
            <mat-icon>menu</mat-icon>
          </button>

          <span class="jobmagnetic-title text-lg whitespace-nowrap">
            Admin Dashboard
          </span>
        </div>

        <div class="flex items-center gap-1 flex-shrink-0">
          <button mat-icon-button class="md:hidden transition-transform hover:scale-110">
            <mat-icon>search</mat-icon>
          </button>

          <button mat-icon-button
                  matBadge="3"
                  matBadgeColor="warn"
                  class="transition-transform hover:scale-110">
            <mat-icon>notifications</mat-icon>
          </button>

          <button mat-icon-button class="transition-transform hover:scale-110">
            <mat-icon>account_circle</mat-icon>
          </button>

          <app-theme-selector></app-theme-selector>
        </div>

      </div>
    </mat-toolbar>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .mat-toolbar {
      padding: 0 16px;
      min-height: 64px !important;
      height: 64px !important;
    }

    /* Ensure proper spacing and alignment */
    .mat-toolbar .flex {
      min-height: 100%;
    }

    /* Mobile responsive adjustments */
    @media (max-width: 768px) {
      .mat-toolbar {
        padding: 0 12px;
      }
    }

    /* Fix Material Design button spacing */
    ::ng-deep .mat-mdc-icon-button {
      width: 40px;
      height: 40px;
      padding: 8px;
    }

    /* Theme selector spacing */
    app-theme-selector {
      display: flex;
      align-items: center;
    }

    /* Global search responsive */
    app-global-search {
      width: 100%;
      max-width: 100%;
    }
  `]
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  onMenuToggle() {
    this.menuToggle.emit();
  }
}
