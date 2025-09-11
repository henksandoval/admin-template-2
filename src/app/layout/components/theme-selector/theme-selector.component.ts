import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import {ThemeMode, ThemeColor, ThemeService} from '@layout/services/theme/theme.service';

interface ColorPreset {
  name: string;
  colorKey: ThemeColor;
  hexValue: string; // For visual preview only
}

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
  styleUrl: './theme-selector.component.scss'
})
export class ThemeSelectorComponent {

  themeService = inject(ThemeService);

  primaryColorPresets: ColorPreset[] = [
    { name: 'JobMagnetic Blue', colorKey: 'jobmagnetic-blue', hexValue: '#4758B8' },
    { name: 'Royal Blue', colorKey: 'royal-blue', hexValue: '#4169E1' },
    { name: 'Purple', colorKey: 'purple', hexValue: '#9C27B0' },
    { name: 'Indigo', colorKey: 'indigo', hexValue: '#3F51B5' },
    { name: 'Deep Purple', colorKey: 'deep-purple', hexValue: '#673AB7' },
    { name: 'Blue', colorKey: 'blue', hexValue: '#2196F3' }
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

  setPrimaryColor(colorKey: ThemeColor): void {
    this.themeService.setPrimaryColor(colorKey);
  }

  setAccentColor(color: string): void {
    this.themeService.setAccentColor(color);
  }

  resetTheme(): void {
    this.themeService.resetToJobMagneticDefaults();
  }

  getCurrentPrimaryColorHex(): string {
    const currentColorKey = this.themeService.currentTheme().primaryColor;
    return this.primaryColorPresets.find(preset => preset.colorKey === currentColorKey)?.hexValue || '#4758B8';
  }
}
