import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="p-6">
      <div class="mb-8">
        <h1 class="jobmagnetic-title text-3xl mb-2" style="color: var(--mat-sys-primary);">
          Components Showcase
        </h1>
        <p class="jobmagnetic-body text-lg" style="color: var(--mat-sys-on-surface-variant);">
          Explore Angular Material components with Tailwind styling
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <mat-card
          *ngFor="let item of showcaseItems"
          class="showcase-card cursor-pointer transition-all duration-300 hover:shadow-lg"
          (click)="navigateToShowcase(item.route)"
          [style]="'border-left: 4px solid var(--mat-sys-' + item.color + ');'"
        >
          <mat-card-header class="pb-4">
            <div mat-card-avatar class="showcase-avatar" [style]="'background-color: var(--mat-sys-' + item.color + '-container); color: var(--mat-sys-on-' + item.color + '-container);'">
              <mat-icon>{{ item.icon }}</mat-icon>
            </div>
            <mat-card-title class="jobmagnetic-heading text-lg">{{ item.title }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p class="jobmagnetic-small text-sm mb-4" style="color: var(--mat-sys-on-surface-variant);">
              {{ item.description }}
            </p>
          </mat-card-content>
          <mat-card-actions class="justify-end">
            <button mat-button [style]="'color: var(--mat-sys-' + item.color + ');'">
              <mat-icon class="mr-1">arrow_forward</mat-icon>
              Explore
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <!-- Router outlet para mostrar componentes específicos cuando se navegue a ellos -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .showcase-card {
      transition: transform 0.2s ease-in-out;
    }

    .showcase-card:hover {
      transform: translateY(-2px);
    }

    .showcase-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .showcase-avatar mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
  `]
})
export class ShowcaseComponent {

  showcaseItems: ShowcaseItem[] = [
    {
      id: 'forms',
      title: 'Form Fields',
      description: 'Input fields, textareas, and form controls with various appearances and configurations.',
      icon: 'edit_note',
      route: '/showcase/forms',
      color: 'primary'
    },
    {
      id: 'selections',
      title: 'Selection Controls',
      description: 'Dropdowns, autocomplete, date pickers, and multi-select components.',
      icon: 'radio_button_checked',
      route: '/showcase/selections',
      color: 'tertiary'
    },
    {
      id: 'checkboxes',
      title: 'Checkboxes & Radio',
      description: 'Checkbox groups, radio buttons, and slide toggles for binary choices.',
      icon: 'check_box',
      route: '/showcase/checkboxes',
      color: 'primary'
    },
    {
      id: 'buttons',
      title: 'Buttons & Toggles',
      description: 'Various button types, FABs, icon buttons, and button toggle groups.',
      icon: 'smart_button',
      route: '/showcase/buttons',
      color: 'tertiary'
    },
    {
      id: 'chips',
      title: 'Chips',
      description: 'Chip lists, selectable chips, and input chips for tags and filters.',
      icon: 'label',
      route: '/showcase/chips',
      color: 'primary'
    },
    {
      id: 'sliders',
      title: 'Sliders',
      description: 'Range sliders, discrete sliders, and thumb sliders for value selection.',
      icon: 'tune',
      route: '/showcase/sliders',
      color: 'tertiary'
    },
    {
      id: 'progress',
      title: 'Progress Indicators',
      description: 'Progress bars, spinners, and loading indicators for async operations.',
      icon: 'progress_activity',
      route: '/showcase/progress',
      color: 'primary'
    },
    {
      id: 'expansion',
      title: 'Expansion Panels',
      description: 'Collapsible panels for organizing content and complex forms.',
      icon: 'expand_more',
      route: '/showcase/expansion',
      color: 'tertiary'
    },
    {
      id: 'tabs',
      title: 'Tabs',
      description: 'Tab groups for organizing related content into separate views.',
      icon: 'tab',
      route: '/showcase/tabs',
      color: 'primary'
    },
    {
      id: 'lists',
      title: 'Lists',
      description: 'Material lists with icons, avatars, and multiple lines of content.',
      icon: 'list',
      route: '/showcase/lists',
      color: 'tertiary'
    },
    {
      id: 'interactive',
      title: 'Interactive Elements',
      description: 'Tooltips, badges, menus, and other interactive UI components.',
      icon: 'touch_app',
      route: '/showcase/interactive',
      color: 'primary'
    },
    {
      id: 'jobmagnetic',
      title: 'JobMagnetic Variables',
      description: 'Brand colors, gradients, and Material Design 3 variables showcase.',
      icon: 'palette',
      route: '/showcase/jobmagnetic',
      color: 'tertiary'
    }
  ];

  constructor(private router: Router) {}

  navigateToShowcase(route: string) {
    this.router.navigate([route]);
  }
}
