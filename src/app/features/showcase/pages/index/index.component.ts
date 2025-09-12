import { Component, inject } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-index',
    imports: [
      CommonModule,
      MatCardModule,
      MatButtonModule,
      MatIconModule
    ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

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
    },
    {
      id: 'cards',
      title: 'Cards',
      description: 'Versatile containers for organizing content with headers, images, and actions.',
      icon: 'credit_card',
      route: '/showcase/cards',
      color: 'primary'
    },
    {
      id: 'tables',
      title: 'Data Tables',
      description: 'Advanced tables with sorting, pagination, filtering, and row selection.',
      icon: 'table_view',
      route: '/showcase/tables',
      color: 'tertiary'
    },
    {
      id: 'layout-components',
      title: 'Layout Components',
      description: 'Stepper, Tree, and Grid List components for complex layouts.',
      icon: 'view_quilt',
      route: '/showcase/layout-components',
      color: 'primary'
    },
    {
      id: 'popups-overlays',
      title: 'Popups & Overlays',
      description: 'Dialogs, snackbars, and bottom sheets for enhanced interactions.',
      icon: 'layers',
      route: '/showcase/popups-overlays',
      color: 'tertiary'
    }
  ];

  private router = inject(Router);

  navigateToShowcase(route: string) {
    this.router.navigate([route]);
  }
}
