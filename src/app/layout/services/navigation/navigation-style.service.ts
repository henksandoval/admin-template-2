import { inject, Injectable } from '@angular/core';
import { NavigationItem, NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationStyleService {
  private navigationService = inject(NavigationService);

  private isActive(item: NavigationItem): boolean {
    return !!item.route && this.navigationService.isActiveRoute(item.route.substring(1));
  }

  private hasActiveChild(item: NavigationItem): boolean {
    if (!item.children) return false;
    return item.children.some(child => 
      this.isActive(child) || this.hasActiveChild(child)
    );
  }

  private isActiveOrHasActiveChild(item: NavigationItem): boolean {
    return this.isActive(item) || this.hasActiveChild(item);
  }

  public getItemClasses(item: NavigationItem): string {
    const level = item.level || 1;
    const isActiveState = this.isActiveOrHasActiveChild(item);
    const isDirectlyActive = this.isActive(item);
    
    // Base classes for all menu items
    let classes = [
      'relative',
      'flex',
      'items-center',
      'w-full',
      'px-3',
      'py-2',
      'mb-1',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'ease-in-out',
      'group'
    ];

    // Level-based indentation
    if (level > 1) {
      classes.push(`ml-${(level - 1) * 4}`);
    }

    // Active state styling
    if (isActiveState) {
      classes.push(
        'bg-primary/10',
        'text-primary',
        'before:absolute',
        'before:left-0',
        'before:top-0',
        'before:h-full',
        'before:w-1',
        'before:bg-primary',
        'before:rounded-r-full'
      );
    } else {
      // Inactive state styling
      classes.push(
        'text-gray-600',
        'dark:text-gray-300',
        'hover:bg-gray-100',
        'dark:hover:bg-gray-800/50'
      );
    }

    return classes.join(' ');
  }

  public getIconClasses(item: NavigationItem): string {
    const isActiveState = this.isActiveOrHasActiveChild(item);
    
    let classes = [
      'flex-shrink-0',
      'w-5',
      'h-5',
      'mr-3',
      'transition-colors',
      'duration-200'
    ];

    if (isActiveState) {
      classes.push('text-primary');
    } else {
      classes.push('text-gray-500', 'dark:text-gray-400', 'group-hover:text-gray-700', 'dark:group-hover:text-gray-200');
    }

    return classes.join(' ');
  }

  public getTextClasses(item: NavigationItem): string {
    const isActiveState = this.isActiveOrHasActiveChild(item);
    
    let classes = [
      'flex-1',
      'text-sm',
      'font-medium',
      'transition-colors',
      'duration-200',
      'truncate'
    ];

    if (isActiveState) {
      classes.push('text-primary');
    } else {
      classes.push('text-gray-700', 'dark:text-gray-200', 'group-hover:text-gray-900', 'dark:group-hover:text-white');
    }

    return classes.join(' ');
  }

  public getExpandIconClasses(item: NavigationItem, isExpanded: boolean): string {
    const isActiveState = this.isActiveOrHasActiveChild(item);
    
    let classes = [
      'flex-shrink-0',
      'w-4',
      'h-4',
      'ml-auto',
      'transition-all',
      'duration-200'
    ];

    if (isExpanded) {
      classes.push('rotate-90');
    }

    if (isActiveState) {
      classes.push('text-primary');
    } else {
      classes.push('text-gray-400', 'dark:text-gray-500', 'group-hover:text-gray-600', 'dark:group-hover:text-gray-300');
    }

    return classes.join(' ');
  }
}
