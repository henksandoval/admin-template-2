import { Routes } from '@angular/router';
import { AppLayoutComponent } from '@layout/layout.component';
import { AppRoute } from '@core/models/app-route.model';
import { authGuard } from '@core/guards/auth.guard';

export const routes: AppRoute[] = [
  // Public routes
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      label: 'Login',
      hiddenInMenu: true
    }
  },
  // Protected routes
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
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
          {
            path: 'chips',
            loadComponent: () => import('./features/showcase/pages/chips/chips.component').then(m => m.ChipsComponent),
            data: {
              label: 'Chips',
              icon: 'label',
              level: 2
            }
          },
          {
            path: 'sliders',
            loadComponent: () => import('./features/showcase/pages/sliders/sliders.component').then(m => m.SlidersComponent),
            data: {
              label: 'Sliders',
              icon: 'tune',
              level: 2
            }
          },
          {
            path: 'progress',
            loadComponent: () => import('./features/showcase/pages/progress/progress.component').then(m => m.ProgressComponent),
            data: {
              label: 'Progress Indicators',
              icon: 'progress_activity',
              level: 2
            }
          },
          {
            path: 'expansion',
            loadComponent: () => import('./features/showcase/pages/expansion/expansion.component').then(m => m.ExpansionComponent),
            data: {
              label: 'Expansion Panels',
              icon: 'expand_more',
              level: 2
            }
          },
          {
            path: 'tabs',
            loadComponent: () => import('./features/showcase/pages/tabs/tabs.component').then(m => m.TabsComponent),
            data: {
              label: 'Tabs',
              icon: 'tab',
              level: 2
            }
          },
          {
            path: 'lists',
            loadComponent: () => import('./features/showcase/pages/lists/lists.component').then(m => m.ListsComponent),
            data: {
              label: 'Lists',
              icon: 'list',
              level: 2
            }
          },
          {
            path: 'interactive',
            loadComponent: () => import('./features/showcase/pages/interactive/interactive.component').then(m => m.InteractiveComponent),
            data: {
              label: 'Interactive Elements',
              icon: 'touch_app',
              level: 2
            }
          },
          {
            path: 'jobmagnetic',
            loadComponent: () => import('./features/showcase/pages/jobmagnetic/jobmagnetic.component').then(m => m.JobmagneticComponent),
            data: {
              label: 'JobMagnetic Variables',
              icon: 'palette',
              level: 2
            }
          },
          {
            path: 'cards',
            loadComponent: () => import('./features/showcase/pages/cards/cards.component').then(m => m.CardsComponent),
            data: {
              label: 'Cards',
              icon: 'credit_card',
              level: 2
            }
          },
          {
            path: 'tables',
            loadComponent: () => import('./features/showcase/pages/tables/tables.component').then(m => m.TablesComponent),
            data: {
              label: 'Data Tables',
              icon: 'table_view',
              level: 2
            }
          },
          {
            path: 'layout-components',
            loadComponent: () => import('./features/showcase/pages/layout-components/layout-components.component').then(m => m.LayoutComponentsComponent),
            data: {
              label: 'Layout Components',
              icon: 'view_quilt',
              level: 2
            }
          },
          {
            path: 'popups-overlays',
            loadComponent: () => import('./features/showcase/pages/popups-overlays/popups-overlays.component').then(m => m.PopupsOverlaysComponent),
            data: {
              label: 'Popups & Overlays',
              icon: 'layers',
              level: 2
            }
          },
          {
            path: 'indicators',
            loadComponent: () => import('./features/showcase/pages/indicators/indicators.component').then(m => m.IndicatorsComponent),
            data: {
              label: 'Indicators & Utilities',
              icon: 'label',
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
  { path: '**', redirectTo: '/login' }
];
