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
