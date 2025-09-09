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
  styleUrl: './theme-selector.component.scss'
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
