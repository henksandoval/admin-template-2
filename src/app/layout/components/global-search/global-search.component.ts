import { Component, inject, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {SearchableItem, SearchService} from '@layout/services/search/search.service';

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule
  ],
  template: `
    <div class="global-search-container">
      <!-- Search Input -->
      <mat-form-field appearance="outline" class="search-field">
        <mat-icon matPrefix>search</mat-icon>
        <input matInput
               #searchInput
               placeholder="Search components, features..."
               [value]="searchService.searchQuery()"
               (input)="onSearchInput($event)"
               (focus)="onSearchFocus()"
               (blur)="onSearchBlur()"
               [matAutocomplete]="searchAutocomplete"
               autocomplete="off">

        @if (searchService.searchQuery()) {
          <button matSuffix
                  mat-icon-button
                  (click)="clearSearch()"
                  aria-label="Clear search">
            <mat-icon>close</mat-icon>
          </button>
        }

        @if (hasResults()) {
          <button matSuffix
                  mat-icon-button
                  [matMenuTriggerFor]="categoryMenu"
                  aria-label="Filter by category">
            <mat-icon>filter_list</mat-icon>
          </button>
        }
      </mat-form-field>

      <!-- Search Autocomplete -->
      <mat-autocomplete #searchAutocomplete="matAutocomplete"
                       (optionSelected)="navigateToItem($event.option.value)"
                       class="search-autocomplete">
        @if (searchService.searchSuggestions().length > 0) {
          <div class="search-results-header">
            <span class="results-count">
              {{ searchService.searchResults().length }} result{{ searchService.searchResults().length !== 1 ? 's' : '' }}
            </span>
          </div>

          @for (item of searchService.searchSuggestions(); track item.id) {
            <mat-option [value]="item" class="search-result-option">
              <div class="search-result-item">
                <div class="search-result-icon">
                  <mat-icon>{{ item.icon }}</mat-icon>
                </div>
                <div class="search-result-content">
                  <div class="search-result-title">{{ item.title }}</div>
                  <div class="search-result-description">{{ item.description }}</div>
                  <div class="search-result-meta">
                    <span class="search-result-category">{{ item.category }}</span>
                    <span class="search-result-route">{{ item.route }}</span>
                  </div>
                </div>
              </div>
            </mat-option>
          }

          @if (searchService.searchResults().length > 6) {
            <div class="search-results-footer">
              <button mat-button (click)="showAllResults()" class="view-all-button">
                <mat-icon>visibility</mat-icon>
                View all {{ searchService.searchResults().length }} results
              </button>
            </div>
          }
        } @else if (searchService.searchQuery()) {
          <div class="no-results">
            <mat-icon>search_off</mat-icon>
            <span>No results found for "{{ searchService.searchQuery() }}"</span>
          </div>
        } @else {
          <div class="search-tips">
            <div class="tip-header">
              <mat-icon>lightbulb</mat-icon>
              <span>Search Tips</span>
            </div>
            <div class="tips-list">
              <div class="tip">Try "forms", "buttons", "theme"</div>
              <div class="tip">Search by component name or feature</div>
              <div class="tip">Use filters to narrow results</div>
            </div>
          </div>
        }
      </mat-autocomplete>

      <!-- Category Filter Menu -->
      <mat-menu #categoryMenu="matMenu" class="category-menu">
        <div class="category-menu-header">
          <mat-icon>filter_list</mat-icon>
          <span>Filter by Category</span>
        </div>
        <mat-divider></mat-divider>

        <button mat-menu-item
                (click)="selectCategory('')"
                [class.active]="!searchService.selectedCategory()">
          <mat-icon>all_inclusive</mat-icon>
          <span>All Categories</span>
          @if (!searchService.selectedCategory()) {
            <mat-icon class="check-icon">check</mat-icon>
          }
        </button>

        @for (category of searchService.categories(); track category) {
          <button mat-menu-item
                  (click)="selectCategory(category)"
                  [class.active]="searchService.selectedCategory() === category">
            <mat-icon>{{ getCategoryIcon(category) }}</mat-icon>
            <span>{{ category }}</span>
            @if (searchService.selectedCategory() === category) {
              <mat-icon class="check-icon">check</mat-icon>
            }
          </button>
        }
      </mat-menu>

      <!-- Selected Category Chip -->
      @if (searchService.selectedCategory()) {
        <div class="selected-filters">
          <mat-chip-set>
            <mat-chip [removable]="true" (removed)="selectCategory('')">
              <mat-icon matChipAvatar>{{ getCategoryIcon(searchService.selectedCategory()) }}</mat-icon>
              {{ searchService.selectedCategory() }}
              <mat-icon matChipRemove>close</mat-icon>
            </mat-chip>
          </mat-chip-set>
        </div>
      }
    </div>
  `,
  styles: [`
    .global-search-container {
      position: relative;
      width: 100%;
      max-width: 400px;
    }

    .search-field {
      width: 100%;
    }

    .search-field .mdc-text-field {
      height: 40px;
    }

    .search-field .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }

    .search-field .mat-mdc-text-field-wrapper {
      padding: 0;
    }

    .search-field .mat-mdc-form-field-infix {
      min-height: 40px;
      padding: 8px 0;
    }

    .search-autocomplete {
      max-width: 500px;
    }

    .search-results-header {
      padding: 12px 16px 8px;
      background-color: var(--mat-sys-surface-container);
      border-bottom: 1px solid var(--mat-sys-outline-variant);
    }

    .results-count {
      font-size: 12px;
      color: var(--mat-sys-on-surface-variant);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .search-result-option {
      min-height: 72px !important;
      height: auto !important;
      padding: 0 !important;
    }

    .search-result-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 16px;
      width: 100%;
    }

    .search-result-icon {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background-color: var(--mat-sys-primary-container);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--mat-sys-on-primary-container);
    }

    .search-result-content {
      flex: 1;
      min-width: 0;
    }

    .search-result-title {
      font-weight: 500;
      font-size: 14px;
      color: var(--mat-sys-on-surface);
      margin-bottom: 4px;
    }

    .search-result-description {
      font-size: 12px;
      color: var(--mat-sys-on-surface-variant);
      line-height: 1.4;
      margin-bottom: 6px;
    }

    .search-result-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
    }

    .search-result-category {
      background-color: var(--mat-sys-tertiary-container);
      color: var(--mat-sys-on-tertiary-container);
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 500;
    }

    .search-result-route {
      color: var(--mat-sys-outline);
      font-family: 'Roboto Mono', monospace;
    }

    .search-results-footer {
      padding: 8px 16px;
      background-color: var(--mat-sys-surface-container);
      border-top: 1px solid var(--mat-sys-outline-variant);
    }

    .view-all-button {
      width: 100%;
      justify-content: center;
      color: var(--mat-sys-primary);
    }

    .no-results {
      padding: 24px 16px;
      text-align: center;
      color: var(--mat-sys-on-surface-variant);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .search-tips {
      padding: 16px;
    }

    .tip-header {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--mat-sys-primary);
      font-weight: 500;
      margin-bottom: 12px;
    }

    .tips-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .tip {
      font-size: 12px;
      color: var(--mat-sys-on-surface-variant);
      padding-left: 16px;
      position: relative;
    }

    .tip::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--mat-sys-outline);
    }

    .category-menu-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      color: var(--mat-sys-primary);
      font-weight: 500;
    }

    .mat-mdc-menu-item.active {
      background-color: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
    }

    .check-icon {
      margin-left: auto;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .selected-filters {
      margin-top: 8px;
    }

    .mat-mdc-chip {
      --mdc-chip-container-height: 28px;
    }

    /* Focus states */
    .search-field:focus-within {
      .mat-mdc-form-field-outline {
        color: var(--mat-sys-primary);
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .global-search-container {
        max-width: 100%;
      }

      .search-autocomplete {
        max-width: 100vw;
      }
    }
  `]
})
export class GlobalSearchComponent {

  searchService = inject(SearchService);
  router = inject(Router);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  isSearchFocused = signal(false);

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchService.setSearchQuery(target.value);
  }

  onSearchFocus(): void {
    this.isSearchFocused.set(true);
  }

  onSearchBlur(): void {
    // Delay blur to allow option selection
    setTimeout(() => {
      this.isSearchFocused.set(false);
    }, 200);
  }

  clearSearch(): void {
    this.searchService.clearSearch();
    this.searchInput.nativeElement.focus();
  }

  navigateToItem(item: SearchableItem): void {
    this.router.navigate([item.route]);
    this.clearSearch();
  }

  selectCategory(category: string): void {
    this.searchService.setSelectedCategory(category);
  }

  hasResults(): boolean {
    return this.searchService.searchResults().length > 0;
  }

  showAllResults(): void {
    // Could navigate to a dedicated search results page
    // For now, just log all results
    console.log('All search results:', this.searchService.searchResults());
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Forms': 'assignment',
      'Interactive': 'touch_app',
      'Feedback': 'feedback',
      'Layout': 'view_module',
      'Navigation': 'menu',
      'Theme': 'palette',
      'Pages': 'pages'
    };
    return icons[category] || 'category';
  }
}
