import { Routes } from '@angular/router';
import { AppLayoutComponent } from '@layout/layout.component';
import { AppRoute } from '@core/models/app-route.model';

export const routes: AppRoute[] = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: {
          label: 'Dashboard',
          icon: 'dashboard',
          level: 1,
          order: 1
        }
      },
      {
        path: 'showcase',
        loadComponent: () => import('./features/showcase/showcase.component').then(m => m.ShowcaseComponent),
        data: {
          label: 'Components Showcase',
          icon: 'visibility',
          level: 1,
          order: 2
        },
        children: [
          {
            path: '',
            loadComponent: () => import('./features/showcase/pages/index/index.component').then(m => m.IndexComponent),
            data: {
              label: 'Showcase',
              hiddenInMenu: true
            }
          },
          {
            path: 'forms',
            loadComponent: () => import('./features/showcase/pages/basic-forms/basic-forms.component').then(m => m.BasicFormsComponent),
            data: {
              label: 'Form Fields',
              icon: 'edit_note',
              level: 2
            }
          },
          {
            path: 'selections',
            loadComponent: () => import('./features/showcase/pages/selections/selections.component').then(m => m.SelectionsComponent),
            data: {
              label: 'Selection Controls',
              icon: 'radio_button_checked',
              level: 2
            }
          },
          {
            path: 'checkboxes',
            loadComponent: () => import('./features/showcase/pages/checkboxes/checkboxes.component').then(m => m.CheckboxesComponent),
            data: {
              label: 'Checkboxes & Radio',
              icon: 'check_box',
              level: 2
            }
          },
          {
            path: 'buttons',
            loadComponent: () => import('./features/showcase/pages/buttons/buttons.component').then(m => m.ButtonsComponent),
            data: {
              label: 'Buttons & Toggles',
              icon: 'smart_button',
              level: 2
            }
          },
        ]
      },
      {
        path: 'pds',
        loadComponent: () => import('./features/pds/showcase.component').then(m => m.ShowcaseComponent),
        data: {
          label: 'PDS',
          icon: 'dashboard_customize',
          level: 1,
          order: 3
        },
        children: [
          {
            path: '',
            loadComponent: () => import('./features/pds/pages/index/index.component').then(m => m.IndexComponent),
            data: {
              label: 'Showcase',
              hiddenInMenu: true
            }
          },
          {
            path: 'forms',
            loadComponent: () => import('./features/pds/pages/basic-forms/basic-forms.component').then(m => m.BasicFormsComponent),
            data: {
              label: 'Form Fields',
              icon: 'edit_note',
              level: 2
            }
          },
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
