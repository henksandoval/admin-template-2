import { Routes } from '@angular/router';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {AppLayoutComponent} from '@layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {
        path: 'showcase',
        loadComponent: () => import('./features/showcase/showcase.component').then(m => m.ShowcaseComponent),
        children: [
          {
            path: '',
            loadComponent: () => import('./features/showcase/pages/index/index.component').then(m => m.IndexComponent)
          },
          {
            path: 'forms',
            loadComponent: () => import('./features/showcase/pages/basic-forms/basic-forms.component').then(m => m.BasicFormsComponent)
          },
        ]
      },
      {
        path: 'pds',
        loadComponent: () => import('./features/pds/showcase.component').then(m => m.ShowcaseComponent),
        children: [
          {
            path: '',
            loadComponent: () => import('./features/pds/pages/index/index.component').then(m => m.IndexComponent)
          },
          {
            path: 'forms',
            loadComponent: () => import('./features/pds/pages/basic-forms/basic-forms.component').then(m => m.BasicFormsComponent)
          },
        ]
      },
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },
  { path: '**', redirectTo: '' }
];
