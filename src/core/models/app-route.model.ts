import { Route } from '@angular/router';

export interface AppRoute extends Route {
  data?: {
    label: string;
    icon?: string;
    hiddenInMenu?: boolean;
  };
  children?: AppRoute[];
}
