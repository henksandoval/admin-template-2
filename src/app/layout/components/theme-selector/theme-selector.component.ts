import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import {ThemeMode, ThemeService} from '@layout/services/theme/theme.service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatSliderModule,
    FormsModule
  ],
  templateUrl: './theme-selector.component.html',
  styles: [`
    .theme-toggle {
      transition: all 0.3s ease;
    }

    .theme-toggle:hover {
      transform: scale(1.1);
    }

    .theme-menu {
      min-width: 280px;
    }

    .theme-menu-header {
      display: flex;
      align-items: center;
      padding: 16px;
      gap: 12px;
      color: var(--mat-sys-primary);
    }

    .theme-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .theme-title {
      font-weight: 600;
      font-size: 16px;
    }

    .theme-section {
      padding: 12px 16px;
    }

    .section-title {
      font-weight: 500;
      font-size: 14px;
      color: var(--mat-sys-on-surface-variant);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .mat-mdc-menu-item.active {
      background-color: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
    }

    .check-icon {
      margin-left: auto;
      color: var(--mat-sys-primary);
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .color-control {
      margin-bottom: 16px;
    }

    .color-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .color-preview {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid var(--mat-sys-outline);
      box-shadow: var(--mat-sys-level1-shadow);
    }

    .color-presets {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .color-preset {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }

    .color-preset:hover {
      transform: scale(1.1);
      border-color: var(--mat-sys-outline);
    }

    .color-preset.active {
      border-color: var(--mat-sys-primary);
      box-shadow: 0 0 0 2px var(--mat-sys-primary-container);
    }

    .color-preset.active::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 14px;
      font-weight: bold;
      text-shadow: var(--mat-sys-level1-shadow);
    }

    .reset-button {
      color: var(--mat-sys-error);
    }

    .reset-button mat-icon {
      color: var(--mat-sys-error);
    }
  `]
})
export class ThemeSelectorComponent {

  themeService = inject(ThemeService);

  primaryColorPresets = [
    { name: 'JobMagnetic Blue', value: '#4758B8' },
    { name: 'Royal Blue', value: '#4169E1' },
    { name: 'Purple', value: '#9C27B0' },
    { name: 'Indigo', value: '#3F51B5' },
    { name: 'Deep Purple', value: '#673AB7' },
    { name: 'Blue', value: '#2196F3' }
  ];

  accentColorPresets = [
    { name: 'JobMagnetic Green', value: '#00D58A' },
    { name: 'Teal', value: '#009688' },
    { name: 'Green', value: '#4CAF50' },
    { name: 'Light Green', value: '#8BC34A' },
    { name: 'Cyan', value: '#00BCD4' },
    { name: 'Lime', value: '#CDDC39' }
  ];

  setThemeMode(mode: ThemeMode): void {
    this.themeService.setThemeMode(mode);
  }

  setPrimaryColor(color: string): void {
    this.themeService.setPrimaryColor(color);
  }

  setAccentColor(color: string): void {
    this.themeService.setAccentColor(color);
  }

  resetTheme(): void {
    this.themeService.resetToJobMagneticDefaults();
  }
}
