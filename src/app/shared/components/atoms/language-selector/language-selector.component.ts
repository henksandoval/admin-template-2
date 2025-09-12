import { Component, signal, computed } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { inject } from '@angular/core';

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  template: `
    <button 
      mat-icon-button 
      [matMenuTriggerFor]="languageMenu"
      class="transition-transform hover:scale-110"
      [attr.aria-label]="'Select language'">
      <span class="text-lg">{{ currentLanguage().flag }}</span>
    </button>
    
    <mat-menu #languageMenu="matMenu">
      @for (language of availableLanguages; track language.code) {
        <button 
          mat-menu-item 
          (click)="changeLanguage(language.code)"
          [class.bg-primary]="language.code === currentLanguage().code"
          [class.bg-opacity-10]="language.code === currentLanguage().code">
          <span class="mr-2">{{ language.flag }}</span>
          <span>{{ language.name }}</span>
          @if (language.code === currentLanguage().code) {
            <mat-icon class="ml-auto text-primary">check</mat-icon>
          }
        </button>
      }
    </mat-menu>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class LanguageSelectorComponent {
  private document = inject(DOCUMENT);
  
  private readonly currentLocale = signal(this.getCurrentLocale());
  
  readonly availableLanguages: Language[] = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  readonly currentLanguage = computed(() => {
    const current = this.currentLocale();
    return this.availableLanguages.find(lang => lang.code === current) || this.availableLanguages[0];
  });

  private getCurrentLocale(): string {
    // Get current locale from the URL path, localStorage, or default to 'en-US'
    const path = this.document.location.pathname;
    
    // Check if URL contains locale (e.g., /es/dashboard or /en-US/dashboard)
    const localeMatch = path.match(/^\/([a-z]{2}(-[A-Z]{2})?)\//);
    if (localeMatch) {
      return localeMatch[1];
    }
    
    // Check localStorage for user preference
    const stored = localStorage.getItem('preferred-locale');
    if (stored && this.availableLanguages.some(lang => lang.code === stored)) {
      return stored;
    }
    
    // Default to English
    return 'en-US';
  }

  changeLanguage(localeCode: string): void {
    // Store user preference
    localStorage.setItem('preferred-locale', localeCode);
    
    // Update the signal
    this.currentLocale.set(localeCode);
    
    // Redirect to the new locale URL
    const currentPath = this.document.location.pathname;
    let newPath: string;
    
    // Remove existing locale from path if present
    const pathWithoutLocale = currentPath.replace(/^\/([a-z]{2}(-[A-Z]{2})?)(\/|$)/, '/');
    
    // Build new path with selected locale
    if (localeCode === 'en-US') {
      // For English, we can use the root path or include /en-US/
      newPath = `/en-US${pathWithoutLocale}`;
    } else {
      newPath = `/${localeCode}${pathWithoutLocale}`;
    }
    
    // Navigate to new URL (this will trigger a page reload with the new locale)
    this.document.location.href = newPath;
  }
}