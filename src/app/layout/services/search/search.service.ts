import { Injectable, signal, computed } from '@angular/core';

export interface SearchableItem {
  id: string;
  title: string;
  description: string;
  category: string;
  route: string;
  icon: string;
  keywords: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _searchItems = signal<SearchableItem[]>([
    // Showcase Components
    {
      id: 'forms',
      title: 'Basic Forms',
      description: 'Input fields, form validation, and basic form controls',
      category: 'Forms',
      route: '/showcase/forms',
      icon: 'assignment',
      keywords: ['form', 'input', 'validation', 'text', 'email', 'password', 'textarea']
    },
    {
      id: 'selections',
      title: 'Selection Controls',
      description: 'Dropdowns, selects, and autocomplete components',
      category: 'Forms',
      route: '/showcase/selections',
      icon: 'tune',
      keywords: ['select', 'dropdown', 'autocomplete', 'option', 'choice', 'picker']
    },
    {
      id: 'checkboxes',
      title: 'Checkboxes & Radio',
      description: 'Checkbox and radio button controls',
      category: 'Forms',
      route: '/showcase/checkboxes',
      icon: 'check_box',
      keywords: ['checkbox', 'radio', 'selection', 'toggle', 'choice', 'option']
    },
    {
      id: 'buttons',
      title: 'Buttons & Toggles',
      description: 'Various button styles and toggle controls',
      category: 'Interactive',
      route: '/showcase/buttons',
      icon: 'smart_button',
      keywords: ['button', 'toggle', 'switch', 'action', 'click', 'press']
    },
    {
      id: 'chips',
      title: 'Chips',
      description: 'Interactive chip components for tags and selections',
      category: 'Interactive',
      route: '/showcase/chips',
      icon: 'label',
      keywords: ['chip', 'tag', 'label', 'badge', 'removable', 'selection']
    },
    {
      id: 'sliders',
      title: 'Sliders',
      description: 'Range controls and value sliders with interactive examples',
      category: 'Interactive',
      route: '/showcase/sliders',
      icon: 'tune',
      keywords: ['slider', 'range', 'value', 'control', 'volume', 'brightness', 'color']
    },
    {
      id: 'progress',
      title: 'Progress Indicators',
      description: 'Progress bars, spinners, and loading states',
      category: 'Feedback',
      route: '/showcase/progress',
      icon: 'progress_activity',
      keywords: ['progress', 'loading', 'spinner', 'bar', 'indicator', 'status']
    },
    {
      id: 'expansion',
      title: 'Expansion Panels',
      description: 'Collapsible content panels and multi-step wizards',
      category: 'Layout',
      route: '/showcase/expansion',
      icon: 'expand_more',
      keywords: ['expansion', 'accordion', 'collapsible', 'panel', 'wizard', 'step']
    },
    {
      id: 'tabs',
      title: 'Tabs',
      description: 'Tabbed navigation with badges and notifications',
      category: 'Navigation',
      route: '/showcase/tabs',
      icon: 'tab',
      keywords: ['tab', 'navigation', 'badge', 'notification', 'panel', 'section']
    },
    {
      id: 'lists',
      title: 'Lists',
      description: 'Various list layouts with selection and interactions',
      category: 'Layout',
      route: '/showcase/lists',
      icon: 'list',
      keywords: ['list', 'item', 'selection', 'multi-line', 'avatar', 'action']
    },
    {
      id: 'interactive',
      title: 'Interactive Elements',
      description: 'Tooltips, ripples, snackbars, dialogs, and interactive components',
      category: 'Interactive',
      route: '/showcase/interactive',
      icon: 'touch_app',
      keywords: ['tooltip', 'ripple', 'snackbar', 'dialog', 'sheet', 'menu', 'interactive']
    },
    {
      id: 'animations',
      title: 'Animations Showcase',
      description: 'Smooth transitions, entrance effects, and custom JobMagnetic animations',
      category: 'Interactive',
      route: '/showcase/animations',
      icon: 'animation',
      keywords: ['animation', 'transition', 'effect', 'motion', 'smooth', 'entrance', 'hover', 'stagger']
    },
    {
      id: 'jobmagnetic',
      title: 'JobMagnetic Colors',
      description: 'Brand colors demonstration and Material Design 3 variables',
      category: 'Theme',
      route: '/showcase/jobmagnetic',
      icon: 'palette',
      keywords: ['color', 'theme', 'jobmagnetic', 'brand', 'palette', 'material', 'design']
    },

    // Main Pages
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Main dashboard with overview and analytics',
      category: 'Pages',
      route: '/dashboard',
      icon: 'dashboard',
      keywords: ['dashboard', 'home', 'overview', 'analytics', 'main', 'start']
    }
  ]);

  private _searchQuery = signal('');
  private _selectedCategory = signal<string>('');

  // Public readonly signals
  readonly searchItems = this._searchItems.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();
  readonly selectedCategory = this._selectedCategory.asReadonly();

  // Computed search results
  readonly searchResults = computed(() => {
    const query = this._searchQuery().toLowerCase().trim();
    const category = this._selectedCategory();
    let items = this._searchItems();

    // Filter by category if selected
    if (category) {
      items = items.filter(item => item.category === category);
    }

    // Filter by search query
    if (query) {
      items = items.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const descriptionMatch = item.description.toLowerCase().includes(query);
        const keywordMatch = item.keywords.some(keyword =>
          keyword.toLowerCase().includes(query)
        );
        const categoryMatch = item.category.toLowerCase().includes(query);

        return titleMatch || descriptionMatch || keywordMatch || categoryMatch;
      });
    }

    return items;
  });

  // Get unique categories
  readonly categories = computed(() => {
    const categorySet = new Set(this._searchItems().map(item => item.category));
    return Array.from(categorySet).sort();
  });

  // Quick search suggestions (most relevant matches)
  readonly searchSuggestions = computed(() => {
    const query = this._searchQuery().toLowerCase().trim();
    if (!query || query.length < 2) return [];

    const results = this.searchResults();

    // Sort by relevance: exact title matches first, then description matches
    return results
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();

        // Exact title match gets highest priority
        if (aTitle.includes(query) && !bTitle.includes(query)) return -1;
        if (!aTitle.includes(query) && bTitle.includes(query)) return 1;

        // Title starts with query gets second priority
        if (aTitle.startsWith(query) && !bTitle.startsWith(query)) return -1;
        if (!aTitle.startsWith(query) && bTitle.startsWith(query)) return 1;

        return aTitle.localeCompare(bTitle);
      })
      .slice(0, 6); // Limit to 6 suggestions
  });

  // Public methods
  setSearchQuery(query: string): void {
    this._searchQuery.set(query);
  }

  setSelectedCategory(category: string): void {
    this._selectedCategory.set(category);
  }

  clearSearch(): void {
    this._searchQuery.set('');
    this._selectedCategory.set('');
  }

  // Search for specific term and return immediate results
  search(query: string): SearchableItem[] {
    this.setSearchQuery(query);
    return this.searchResults();
  }

  // Get item by ID
  getItemById(id: string): SearchableItem | undefined {
    return this._searchItems().find(item => item.id === id);
  }

  // Add new searchable item (for extensibility)
  addSearchableItem(item: SearchableItem): void {
    this._searchItems.update(items => [...items, item]);
  }

  // Remove searchable item
  removeSearchableItem(id: string): void {
    this._searchItems.update(items => items.filter(item => item.id !== id));
  }
}
