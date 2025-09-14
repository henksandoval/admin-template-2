import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '@layout/components/header/header.component';
import { MainContentComponent } from '@layout/components/main-content/main-content.component';
import { NavigationService } from '@layout/services/navigation/navigation.service';
import { SidebarComponent } from '@layout/components/sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    HeaderComponent,
    MainContentComponent,
    SidebarComponent
  ],
  template: `
    <div class="bg-background text-on-background min-h-screen flex flex-col">
      <header class="sticky top-0 z-40">
        <app-header (menuToggle)="navigationService.toggleSidebarVisible()"></app-header>
      </header>

      <mat-sidenav-container class="flex-1" autosize>
        <mat-sidenav
          [mode]="'side'"
          [opened]="navigationService.isSidebarVisible()"
          [ngClass]="sidebarClass()"
          class="bg-surface border-r border-outline transition-all duration-300 mat-elevation-z2">
          <app-sidebar></app-sidebar>
        </mat-sidenav>

        <mat-sidenav-content class="bg-background">
          <div class="p-6 lg:p-8 h-full">
            <app-main-content></app-main-content>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
})
export class AppLayoutComponent {
  public navigationService = inject(NavigationService);

  public sidebarClass = computed(() => {
    return this.navigationService.isSidebarCollapsed() ? "!w-20" : "!w-64";
  });
}
