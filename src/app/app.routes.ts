import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AppLayoutComponent } from '@layout/layout.component';
import { AppRoute } from '@core/models/app-route.model';

export const routes: AppRoute[] = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
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
      // Example: Adding a new menu item is now this simple!
      // Just add a route with data.label and it appears in the menu
      // {
      //   path: 'settings',
      //   component: SettingsComponent,
      //   data: {
      //     label: 'Settings',
      //     icon: 'settings',
      //     level: 1,
      //     order: 4
      //   }
      // },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
