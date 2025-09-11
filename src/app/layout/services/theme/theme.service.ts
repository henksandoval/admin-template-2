import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ThemeColor = 'jobmagnetic-blue' | 'royal-blue' | 'purple' | 'indigo' | 'deep-purple' | 'blue';

interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: ThemeColor;
  accentColor: string; // Keep for future use
}

// CSS Custom Properties mapping for global theme application
interface ThemeCustomProperties {
  // System colors
  '--mat-sys-primary': string;
  '--mat-sys-on-primary': string;
  '--mat-sys-primary-container': string;
  '--mat-sys-on-primary-container': string;
  '--mat-sys-secondary': string;
  '--mat-sys-on-secondary': string;
  '--mat-sys-secondary-container': string;
  '--mat-sys-on-secondary-container': string;
  '--mat-sys-tertiary': string;
  '--mat-sys-on-tertiary': string;
  '--mat-sys-tertiary-container': string;
  '--mat-sys-on-tertiary-container': string;
  '--mat-sys-error': string;
  '--mat-sys-on-error': string;
  '--mat-sys-error-container': string;
  '--mat-sys-on-error-container': string;
  '--mat-sys-surface': string;
  '--mat-sys-on-surface': string;
  '--mat-sys-surface-container': string;
  '--mat-sys-surface-container-low': string;
  '--mat-sys-surface-container-high': string;
  '--mat-sys-surface-container-highest': string;
  '--mat-sys-on-surface-variant': string;
  '--mat-sys-outline': string;
  '--mat-sys-outline-variant': string;
  '--mat-sys-background': string;
  '--mat-sys-on-background': string;
}

// Theme custom properties mapping - this provides the CSS custom properties
// that were previously applied as inline styles but now applied programmatically
const THEME_CUSTOM_PROPERTIES: Record<ThemeColor, { light: ThemeCustomProperties; dark: ThemeCustomProperties }> = {
  'jobmagnetic-blue': {
    light: {
      '--mat-sys-primary': '#0052D9',
      '--mat-sys-on-primary': '#FFFFFF',
      '--mat-sys-primary-container': '#D6E3FF',
      '--mat-sys-on-primary-container': '#001C3B',
      '--mat-sys-secondary': '#565E71',
      '--mat-sys-on-secondary': '#FFFFFF',
      '--mat-sys-secondary-container': '#DAE2F9',
      '--mat-sys-on-secondary-container': '#131C2B',
      '--mat-sys-tertiary': '#4DFFB8',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#BA1A1A',
      '--mat-sys-on-error': '#FFFFFF',
      '--mat-sys-error-container': '#FFDAD6',
      '--mat-sys-on-error-container': '#410002',
      '--mat-sys-surface': '#F9F9FF',
      '--mat-sys-on-surface': '#191C20',
      '--mat-sys-surface-container': '#EDEEF4',
      '--mat-sys-surface-container-low': '#F3F4FA',
      '--mat-sys-surface-container-high': '#E7E8EE',
      '--mat-sys-surface-container-highest': '#E1E2E8',
      '--mat-sys-on-surface-variant': '#44474F',
      '--mat-sys-outline': '#74777F',
      '--mat-sys-outline-variant': '#C4C6CF',
      '--mat-sys-background': '#F9F9FF',
      '--mat-sys-on-background': '#191C20'
    },
    dark: {
      '--mat-sys-primary': '#AAC7FF',
      '--mat-sys-on-primary': '#002E69',
      '--mat-sys-primary-container': '#003F95',
      '--mat-sys-on-primary-container': '#D6E3FF',
      '--mat-sys-secondary': '#BEC6DC',
      '--mat-sys-on-secondary': '#283141',
      '--mat-sys-secondary-container': '#3E4759',
      '--mat-sys-on-secondary-container': '#DAE2F9',
      '--mat-sys-tertiary': '#70FFD2',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#FFB4AB',
      '--mat-sys-on-error': '#690005',
      '--mat-sys-error-container': '#93000A',
      '--mat-sys-on-error-container': '#FFDAD6',
      '--mat-sys-surface': '#111318',
      '--mat-sys-on-surface': '#E1E2E8',
      '--mat-sys-surface-container': '#1D2024',
      '--mat-sys-surface-container-low': '#191C20',
      '--mat-sys-surface-container-high': '#272A2F',
      '--mat-sys-surface-container-highest': '#32353A',
      '--mat-sys-on-surface-variant': '#C4C6CF',
      '--mat-sys-outline': '#8E9099',
      '--mat-sys-outline-variant': '#44474F',
      '--mat-sys-background': '#111318',
      '--mat-sys-on-background': '#E1E2E8'
    }
  },
  'royal-blue': {
    light: {
      '--mat-sys-primary': '#4169E1',
      '--mat-sys-on-primary': '#FFFFFF',
      '--mat-sys-primary-container': '#DDE1FF',
      '--mat-sys-on-primary-container': '#001257',
      '--mat-sys-secondary': '#5A5D6B',
      '--mat-sys-on-secondary': '#FFFFFF',
      '--mat-sys-secondary-container': '#DFE1F1',
      '--mat-sys-on-secondary-container': '#171925',
      '--mat-sys-tertiary': '#4DFFB8',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#BA1A1A',
      '--mat-sys-on-error': '#FFFFFF',
      '--mat-sys-error-container': '#FFDAD6',
      '--mat-sys-on-error-container': '#410002',
      '--mat-sys-surface': '#F9F9FF',
      '--mat-sys-on-surface': '#191C20',
      '--mat-sys-surface-container': '#EDEEF4',
      '--mat-sys-surface-container-low': '#F3F4FA',
      '--mat-sys-surface-container-high': '#E7E8EE',
      '--mat-sys-surface-container-highest': '#E1E2E8',
      '--mat-sys-on-surface-variant': '#44474F',
      '--mat-sys-outline': '#74777F',
      '--mat-sys-outline-variant': '#C4C6CF',
      '--mat-sys-background': '#F9F9FF',
      '--mat-sys-on-background': '#191C20'
    },
    dark: {
      '--mat-sys-primary': '#B6C4FF',
      '--mat-sys-on-primary': '#002782',
      '--mat-sys-primary-container': '#1E3DB8',
      '--mat-sys-on-primary-container': '#DDE1FF',
      '--mat-sys-secondary': '#C3C5D5',
      '--mat-sys-on-secondary': '#2C2F3B',
      '--mat-sys-secondary-container': '#424552',
      '--mat-sys-on-secondary-container': '#DFE1F1',
      '--mat-sys-tertiary': '#70FFD2',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#FFB4AB',
      '--mat-sys-on-error': '#690005',
      '--mat-sys-error-container': '#93000A',
      '--mat-sys-on-error-container': '#FFDAD6',
      '--mat-sys-surface': '#111318',
      '--mat-sys-on-surface': '#E1E2E8',
      '--mat-sys-surface-container': '#1D2024',
      '--mat-sys-surface-container-low': '#191C20',
      '--mat-sys-surface-container-high': '#272A2F',
      '--mat-sys-surface-container-highest': '#32353A',
      '--mat-sys-on-surface-variant': '#C4C6CF',
      '--mat-sys-outline': '#8E9099',
      '--mat-sys-outline-variant': '#44474F',
      '--mat-sys-background': '#111318',
      '--mat-sys-on-background': '#E1E2E8'
    }
  },
  'purple': {
    light: {
      '--mat-sys-primary': '#6750A4',
      '--mat-sys-on-primary': '#FFFFFF',
      '--mat-sys-primary-container': '#E9DDFF',
      '--mat-sys-on-primary-container': '#21005D',
      '--mat-sys-secondary': '#625B71',
      '--mat-sys-on-secondary': '#FFFFFF',
      '--mat-sys-secondary-container': '#E8DEF8',
      '--mat-sys-on-secondary-container': '#1E192B',
      '--mat-sys-tertiary': '#4DFFB8',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#BA1A1A',
      '--mat-sys-on-error': '#FFFFFF',
      '--mat-sys-error-container': '#FFDAD6',
      '--mat-sys-on-error-container': '#410002',
      '--mat-sys-surface': '#FBF8FF',
      '--mat-sys-on-surface': '#1B1B21',
      '--mat-sys-surface-container': '#F0EDF4',
      '--mat-sys-surface-container-low': '#F6F2FA',
      '--mat-sys-surface-container-high': '#EAE7EE',
      '--mat-sys-surface-container-highest': '#E4E1E9',
      '--mat-sys-on-surface-variant': '#49454F',
      '--mat-sys-outline': '#7A757F',
      '--mat-sys-outline-variant': '#CAC4D0',
      '--mat-sys-background': '#FBF8FF',
      '--mat-sys-on-background': '#1B1B21'
    },
    dark: {
      '--mat-sys-primary': '#CFBCFF',
      '--mat-sys-on-primary': '#381E72',
      '--mat-sys-primary-container': '#4F378B',
      '--mat-sys-on-primary-container': '#E9DDFF',
      '--mat-sys-secondary': '#CCC2DC',
      '--mat-sys-on-secondary': '#332D41',
      '--mat-sys-secondary-container': '#4A4458',
      '--mat-sys-on-secondary-container': '#E8DEF8',
      '--mat-sys-tertiary': '#70FFD2',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#FFB4AB',
      '--mat-sys-on-error': '#690005',
      '--mat-sys-error-container': '#93000A',
      '--mat-sys-on-error-container': '#FFDAD6',
      '--mat-sys-surface': '#141218',
      '--mat-sys-on-surface': '#E4E1E9',
      '--mat-sys-surface-container': '#201F26',
      '--mat-sys-surface-container-low': '#1B1B21',
      '--mat-sys-surface-container-high': '#2B2930',
      '--mat-sys-surface-container-highest': '#36353B',
      '--mat-sys-on-surface-variant': '#CAC4D0',
      '--mat-sys-outline': '#938F99',
      '--mat-sys-outline-variant': '#49454F',
      '--mat-sys-background': '#141218',
      '--mat-sys-on-background': '#E4E1E9'
    }
  },
  'indigo': {
    light: {
      '--mat-sys-primary': '#3F51B5',
      '--mat-sys-on-primary': '#FFFFFF',
      '--mat-sys-primary-container': '#E1E4FF',
      '--mat-sys-on-primary-container': '#001258',
      '--mat-sys-secondary': '#5A5D72',
      '--mat-sys-on-secondary': '#FFFFFF',
      '--mat-sys-secondary-container': '#DFE1F9',
      '--mat-sys-on-secondary-container': '#171B2C',
      '--mat-sys-tertiary': '#4DFFB8',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#BA1A1A',
      '--mat-sys-on-error': '#FFFFFF',
      '--mat-sys-error-container': '#FFDAD6',
      '--mat-sys-on-error-container': '#410002',
      '--mat-sys-surface': '#F9F9FF',
      '--mat-sys-on-surface': '#191C20',
      '--mat-sys-surface-container': '#EDEEF4',
      '--mat-sys-surface-container-low': '#F3F4FA',
      '--mat-sys-surface-container-high': '#E7E8EE',
      '--mat-sys-surface-container-highest': '#E1E2E8',
      '--mat-sys-on-surface-variant': '#44474F',
      '--mat-sys-outline': '#74777F',
      '--mat-sys-outline-variant': '#C4C6CF',
      '--mat-sys-background': '#F9F9FF',
      '--mat-sys-on-background': '#191C20'
    },
    dark: {
      '--mat-sys-primary': '#BDC7FF',
      '--mat-sys-on-primary': '#002785',
      '--mat-sys-primary-container': '#2A3F9B',
      '--mat-sys-on-primary-container': '#E1E4FF',
      '--mat-sys-secondary': '#C3C5DD',
      '--mat-sys-on-secondary': '#2D3142',
      '--mat-sys-secondary-container': '#434659',
      '--mat-sys-on-secondary-container': '#DFE1F9',
      '--mat-sys-tertiary': '#70FFD2',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#FFB4AB',
      '--mat-sys-on-error': '#690005',
      '--mat-sys-error-container': '#93000A',
      '--mat-sys-on-error-container': '#FFDAD6',
      '--mat-sys-surface': '#111318',
      '--mat-sys-on-surface': '#E1E2E8',
      '--mat-sys-surface-container': '#1D2024',
      '--mat-sys-surface-container-low': '#191C20',
      '--mat-sys-surface-container-high': '#272A2F',
      '--mat-sys-surface-container-highest': '#32353A',
      '--mat-sys-on-surface-variant': '#C4C6CF',
      '--mat-sys-outline': '#8E9099',
      '--mat-sys-outline-variant': '#44474F',
      '--mat-sys-background': '#111318',
      '--mat-sys-on-background': '#E1E2E8'
    }
  },
  'deep-purple': {
    light: {
      '--mat-sys-primary': '#673AB7',
      '--mat-sys-on-primary': '#FFFFFF',
      '--mat-sys-primary-container': '#EADDFF',
      '--mat-sys-on-primary-container': '#21005D',
      '--mat-sys-secondary': '#625B71',
      '--mat-sys-on-secondary': '#FFFFFF',
      '--mat-sys-secondary-container': '#E8DEF8',
      '--mat-sys-on-secondary-container': '#1E192B',
      '--mat-sys-tertiary': '#4DFFB8',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#BA1A1A',
      '--mat-sys-on-error': '#FFFFFF',
      '--mat-sys-error-container': '#FFDAD6',
      '--mat-sys-on-error-container': '#410002',
      '--mat-sys-surface': '#FBF8FF',
      '--mat-sys-on-surface': '#1B1B21',
      '--mat-sys-surface-container': '#F0EDF4',
      '--mat-sys-surface-container-low': '#F6F2FA',
      '--mat-sys-surface-container-high': '#EAE7EE',
      '--mat-sys-surface-container-highest': '#E4E1E9',
      '--mat-sys-on-surface-variant': '#49454F',
      '--mat-sys-outline': '#7A757F',
      '--mat-sys-outline-variant': '#CAC4D0',
      '--mat-sys-background': '#FBF8FF',
      '--mat-sys-on-background': '#1B1B21'
    },
    dark: {
      '--mat-sys-primary': '#D0BCFF',
      '--mat-sys-on-primary': '#381E72',
      '--mat-sys-primary-container': '#4F378B',
      '--mat-sys-on-primary-container': '#EADDFF',
      '--mat-sys-secondary': '#CCC2DC',
      '--mat-sys-on-secondary': '#332D41',
      '--mat-sys-secondary-container': '#4A4458',
      '--mat-sys-on-secondary-container': '#E8DEF8',
      '--mat-sys-tertiary': '#70FFD2',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#FFB4AB',
      '--mat-sys-on-error': '#690005',
      '--mat-sys-error-container': '#93000A',
      '--mat-sys-on-error-container': '#FFDAD6',
      '--mat-sys-surface': '#141218',
      '--mat-sys-on-surface': '#E4E1E9',
      '--mat-sys-surface-container': '#201F26',
      '--mat-sys-surface-container-low': '#1B1B21',
      '--mat-sys-surface-container-high': '#2B2930',
      '--mat-sys-surface-container-highest': '#36353B',
      '--mat-sys-on-surface-variant': '#CAC4D0',
      '--mat-sys-outline': '#938F99',
      '--mat-sys-outline-variant': '#49454F',
      '--mat-sys-background': '#141218',
      '--mat-sys-on-background': '#E4E1E9'
    }
  },
  'blue': {
    light: {
      '--mat-sys-primary': '#2196F3',
      '--mat-sys-on-primary': '#FFFFFF',
      '--mat-sys-primary-container': '#D1E4FF',
      '--mat-sys-on-primary-container': '#001D36',
      '--mat-sys-secondary': '#535F70',
      '--mat-sys-on-secondary': '#FFFFFF',
      '--mat-sys-secondary-container': '#D7E3F7',
      '--mat-sys-on-secondary-container': '#101C2B',
      '--mat-sys-tertiary': '#4DFFB8',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#BA1A1A',
      '--mat-sys-on-error': '#FFFFFF',
      '--mat-sys-error-container': '#FFDAD6',
      '--mat-sys-on-error-container': '#410002',
      '--mat-sys-surface': '#F8F9FF',
      '--mat-sys-on-surface': '#191C20',
      '--mat-sys-surface-container': '#ECEFF6',
      '--mat-sys-surface-container-low': '#F2F5FB',
      '--mat-sys-surface-container-high': '#E6E9F0',
      '--mat-sys-surface-container-highest': '#E0E3EA',
      '--mat-sys-on-surface-variant': '#42474E',
      '--mat-sys-outline': '#72787E',
      '--mat-sys-outline-variant': '#C2C8CE',
      '--mat-sys-background': '#F8F9FF',
      '--mat-sys-on-background': '#191C20'
    },
    dark: {
      '--mat-sys-primary': '#A0CAFD',
      '--mat-sys-on-primary': '#003258',
      '--mat-sys-primary-container': '#00497D',
      '--mat-sys-on-primary-container': '#D1E4FF',
      '--mat-sys-secondary': '#BBC7DB',
      '--mat-sys-on-secondary': '#253140',
      '--mat-sys-secondary-container': '#3B4858',
      '--mat-sys-on-secondary-container': '#D7E3F7',
      '--mat-sys-tertiary': '#70FFD2',
      '--mat-sys-on-tertiary': '#003826',
      '--mat-sys-tertiary-container': '#005138',
      '--mat-sys-on-tertiary-container': '#70FFD2',
      '--mat-sys-error': '#FFB4AB',
      '--mat-sys-on-error': '#690005',
      '--mat-sys-error-container': '#93000A',
      '--mat-sys-on-error-container': '#FFDAD6',
      '--mat-sys-surface': '#10131A',
      '--mat-sys-on-surface': '#E0E3EA',
      '--mat-sys-surface-container': '#1C1F26',
      '--mat-sys-surface-container-low': '#191C20',
      '--mat-sys-surface-container-high': '#262A31',
      '--mat-sys-surface-container-highest': '#31353C',
      '--mat-sys-on-surface-variant': '#C2C8CE',
      '--mat-sys-outline': '#8C9298',
      '--mat-sys-outline-variant': '#42474E',
      '--mat-sys-background': '#10131A',
      '--mat-sys-on-background': '#E0E3EA'
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly STORAGE_KEY = 'jobmagnetic-theme';

  private _currentTheme = signal<ThemeConfig>({
    mode: 'light',
    primaryColor: 'jobmagnetic-blue',
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

    // Apply theme mode classes and data attributes consistently to both elements
    const themeClass = isDark ? 'dark-theme' : 'light-theme';
    const themeMode = isDark ? 'dark' : 'light';
    
    // Apply to document.documentElement (html element)
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(themeClass);
    document.documentElement.setAttribute('data-theme-color', theme.primaryColor);

    // Apply to document.body for consistency
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(themeClass);
    document.body.setAttribute('data-theme-color', theme.primaryColor);

    // Apply CSS custom properties programmatically to :root for global availability
    // This replaces the inline styles approach but maintains the functionality
    this.applyCSSCustomProperties(theme.primaryColor, themeMode);

    // Save theme configuration
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(theme));
  }

  /**
   * Applies CSS custom properties to :root element programmatically
   * This makes theme colors globally available without using inline styles
   */
  private applyCSSCustomProperties(primaryColor: ThemeColor, mode: 'light' | 'dark'): void {
    const customProperties = THEME_CUSTOM_PROPERTIES[primaryColor][mode];
    const rootElement = document.documentElement;

    // Apply each custom property to :root
    Object.entries(customProperties).forEach(([property, value]) => {
      rootElement.style.setProperty(property, value);
    });

    // Also apply legacy JobMagnetic custom properties for backward compatibility
    rootElement.style.setProperty('--jobmagnetic-primary', customProperties['--mat-sys-primary']);
    rootElement.style.setProperty('--jobmagnetic-accent', '#4DFFB8'); // Keep consistent tertiary
  }

  setThemeMode(mode: ThemeMode): void {
    this._currentTheme.update(theme => ({ ...theme, mode }));
    this.updateDarkModeState();
  }

  setPrimaryColor(color: ThemeColor): void {
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
      primaryColor: 'jobmagnetic-blue',
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
