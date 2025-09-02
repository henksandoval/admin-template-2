import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  accentColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly STORAGE_KEY = 'jobmagnetic-theme';

  // Signals for reactive theme management
  private _currentTheme = signal<ThemeConfig>({
    mode: 'light',
    primaryColor: '#4758B8', // JobMagnetic Primary
    accentColor: '#00D58A'   // JobMagnetic Tertiary
  });

  private _isDarkMode = signal<boolean>(false);
  private _systemPrefersDark = signal<boolean>(false);

  // Public readonly signals
  readonly currentTheme = this._currentTheme.asReadonly();
  readonly isDarkMode = this._isDarkMode.asReadonly();
  readonly systemPrefersDark = this._systemPrefersDark.asReadonly();

  constructor() {
    this.initializeTheme();
    this.watchSystemTheme();

    // Effect to apply theme changes
    effect(() => {
      this.applyTheme();
    });
  }

  private initializeTheme(): void {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme) as ThemeConfig;
        this._currentTheme.set(theme);
      } catch (error) {
        console.warn('Failed to parse saved theme, using default');
      }
    }

    // Set initial dark mode state
    this.updateDarkModeState();
  }

  private watchSystemTheme(): void {
    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this._systemPrefersDark.set(mediaQuery.matches);

    mediaQuery.addEventListener('change', (e) => {
      this._systemPrefersDark.set(e.matches);
      if (this._currentTheme().mode === 'auto') {
        this.updateDarkModeState();
      }
    });
  }

  private updateDarkModeState(): void {
    const theme = this._currentTheme();
    const isDark = theme.mode === 'dark' ||
      (theme.mode === 'auto' && this._systemPrefersDark());
    this._isDarkMode.set(isDark);
  }

  private applyTheme(): void {
    const theme = this._currentTheme();
    const isDark = this._isDarkMode();

    // Apply theme class to document AND body
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(isDark ? 'dark-theme' : 'light-theme');

    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(isDark ? 'dark-theme' : 'light-theme');

    // Apply custom properties for JobMagnetic colors
    document.documentElement.style.setProperty('--jobmagnetic-primary', theme.primaryColor);
    document.documentElement.style.setProperty('--jobmagnetic-accent', theme.accentColor);

    // Apply Material Design 3 theme variables
    this.applyMaterialTheme(isDark, theme);

    // Save theme to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(theme));
  }

  private applyMaterialTheme(isDark: boolean, theme: ThemeConfig): void {
    const root = document.documentElement;

    if (isDark) {
      // Dark theme colors
      root.style.setProperty('--mat-sys-surface', '#121212');
      root.style.setProperty('--mat-sys-surface-container', '#1e1e1e');
      root.style.setProperty('--mat-sys-surface-container-low', '#1a1a1a');
      root.style.setProperty('--mat-sys-surface-container-high', '#242424');
      root.style.setProperty('--mat-sys-on-surface', '#e1e1e1');
      root.style.setProperty('--mat-sys-on-surface-variant', '#c1c1c1');
      root.style.setProperty('--mat-sys-outline', '#444444');
      root.style.setProperty('--mat-sys-outline-variant', '#333333');

      // Primary colors for dark theme
      root.style.setProperty('--mat-sys-primary', '#8FA7FF'); // Lighter version of JobMagnetic primary
      root.style.setProperty('--mat-sys-on-primary', '#1A1A1A');
      root.style.setProperty('--mat-sys-primary-container', '#2D3748');
      root.style.setProperty('--mat-sys-on-primary-container', '#E2E8F0');

      // Tertiary colors for dark theme
      root.style.setProperty('--mat-sys-tertiary', '#4DFFB8'); // Lighter version of JobMagnetic tertiary
      root.style.setProperty('--mat-sys-on-tertiary', '#1A1A1A');
      root.style.setProperty('--mat-sys-tertiary-container', '#1A4D3A');
      root.style.setProperty('--mat-sys-on-tertiary-container', '#E0FFF4');

    } else {
      // Light theme colors (keep existing JobMagnetic implementation)
      root.style.setProperty('--mat-sys-surface', '#FEFBFF');
      root.style.setProperty('--mat-sys-surface-container', '#F3F0F4');
      root.style.setProperty('--mat-sys-surface-container-low', '#F7F4F8');
      root.style.setProperty('--mat-sys-surface-container-high', '#EDE8EC');
      root.style.setProperty('--mat-sys-on-surface', '#1D1B20');
      root.style.setProperty('--mat-sys-on-surface-variant', '#49454F');
      root.style.setProperty('--mat-sys-outline', '#79747E');
      root.style.setProperty('--mat-sys-outline-variant', '#CAC4D0');

      // Keep original JobMagnetic primary colors for light theme
      root.style.setProperty('--mat-sys-primary', theme.primaryColor);
      root.style.setProperty('--mat-sys-on-primary', '#FFFFFF');
      root.style.setProperty('--mat-sys-primary-container', '#E0E7FF');
      root.style.setProperty('--mat-sys-on-primary-container', '#001A41');

      // Keep original JobMagnetic tertiary colors for light theme
      root.style.setProperty('--mat-sys-tertiary', theme.accentColor);
      root.style.setProperty('--mat-sys-on-tertiary', '#FFFFFF');
      root.style.setProperty('--mat-sys-tertiary-container', '#A6F4CD');
      root.style.setProperty('--mat-sys-on-tertiary-container', '#002114');
    }
  }

  // Public methods
  setThemeMode(mode: ThemeMode): void {
    this._currentTheme.update(theme => ({ ...theme, mode }));
    this.updateDarkModeState();
  }

  setPrimaryColor(color: string): void {
    this._currentTheme.update(theme => ({ ...theme, primaryColor: color }));
  }

  setAccentColor(color: string): void {
    this._currentTheme.update(theme => ({ ...theme, accentColor: color }));
  }

  toggleTheme(): void {
    const currentMode = this._currentTheme().mode;
    const newMode: ThemeMode = currentMode === 'light' ? 'dark' :
      currentMode === 'dark' ? 'auto' : 'light';
    this.setThemeMode(newMode);
  }

  resetToJobMagneticDefaults(): void {
    this._currentTheme.set({
      mode: 'light',
      primaryColor: '#4758B8',
      accentColor: '#00D58A'
    });
    this.updateDarkModeState();
  }

  getThemeModeIcon(): string {
    const mode = this._currentTheme().mode;
    switch (mode) {
      case 'light': return 'light_mode';
      case 'dark': return 'dark_mode';
      case 'auto': return 'brightness_auto';
      default: return 'brightness_auto';
    }
  }

  getThemeModeLabel(): string {
    const mode = this._currentTheme().mode;
    switch (mode) {
      case 'light': return 'Light Theme';
      case 'dark': return 'Dark Theme';
      case 'auto': return 'Auto (System)';
      default: return 'Auto';
    }
  }
}
