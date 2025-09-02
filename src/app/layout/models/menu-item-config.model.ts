import { MenuItemVariant } from '@layout/models/menu-item-variant.model';

export interface MenuItemConfig {
  route?: string;
  label?: string;
  icon?: string;
  variant?: MenuItemVariant;
}
