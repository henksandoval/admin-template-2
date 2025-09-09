import { Route } from '@angular/router';

export interface MenuConfig {
  label: string;
  icon?: string;
  hiddenInMenu?: boolean;
  level?: number;
  badge?: string;
  order?: number;
}

export interface AppRoute extends Route {
  data?: MenuConfig;
  children?: AppRoute[];
}
