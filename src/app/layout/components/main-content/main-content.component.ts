import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {LayoutService} from '@layout/services/layout.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  template: `
    <!-- Main content con Tailwind responsive padding -->
    <main class="flex-1 p-4 md:p-6 lg:p-8 max-w-full overflow-x-hidden">
      <div class="max-w-7xl mx-auto">
        <!-- Breadcrumbs con Material Design theming -->
        <nav class="mb-6">
          <ol class="flex items-center space-x-2 text-sm mat-caption">
            <li><a (click)="layoutService.navigateTo('/dashboard')" class="hover:text-primary transition-colors cursor-pointer">Home</a></li>
            <li>/</li>
            <li class="font-medium mat-body-strong">
              {{ layoutService.currentPageTitle() }}
            </li>
          </ol>
        </nav>

        <!-- Page header con Material Design theming -->
        <div class="mb-8">
          <h1 class="text-2xl md:text-3xl font-bold mat-headline-large mb-2">
            {{ layoutService.currentPageTitle() }}
          </h1>
          <p class="mat-body-medium">
            {{ layoutService.currentPageDescription() }}
          </p>
        </div>

        <!-- Content area - aquí va el router-outlet -->
        <div class="rounded-lg min-h-96">
          <router-outlet></router-outlet>
        </div>
      </div>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      flex: 1;
    }
  `]
})
export class MainContentComponent {
  constructor(public layoutService: LayoutService) {}
}
