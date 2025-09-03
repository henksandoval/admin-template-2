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
        children: [
          {
            path: '',
            loadComponent: () => import('./features/showcase/showcase.component').then(m => m.ShowcaseComponent)
          },
          {
            path: 'forms',
            loadComponent: () => import('./features/showcase/basic-forms/basic-forms.component').then(m => m.BasicFormsComponent)
          },
        ]
      },
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },
  { path: '**', redirectTo: '' }
];
