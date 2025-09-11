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

  private _currentTheme = signal<ThemeConfig>({
    mode: 'light',
    primaryColor: '#4758B8',
    accentColor: '#00D58A'
  });

  private _isDarkMode = signal<boolean>(false);
  private _systemPrefersDark = signal<boolean>(false);

  readonly currentTheme = this._currentTheme.asReadonly();
  readonly isDarkMode = this._isDarkMode.asReadonly();
  readonly systemPrefersDark = this._systemPrefersDark.asReadonly();

  constructor() {
    this.initializeTheme();
    this.watchSystemTheme();

    effect(() => {
      this.applyTheme();
    });
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme) as ThemeConfig;
        this._currentTheme.set(theme);
      } catch (error) {
        console.warn('Failed to parse saved theme, using default');
      }
    }

    this.updateDarkModeState();
  }

  private watchSystemTheme(): void {
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

    // Apply theme classes to document elements
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(isDark ? 'dark-theme' : 'light-theme');

    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(isDark ? 'dark-theme' : 'light-theme');

    // Apply dynamic user-customizable colors via CSS custom properties
    document.documentElement.style.setProperty('--jobmagnetic-primary', theme.primaryColor);
    document.documentElement.style.setProperty('--jobmagnetic-accent', theme.accentColor);

    // Save theme configuration to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(theme));
  }

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
