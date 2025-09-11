import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sliders',
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './sliders.component.html',
  styleUrl: './sliders.component.scss'
})
export class SlidersComponent {
  private router = inject(Router);

  value = 50;
  rangeValue = 25;
  discreteValue = 3;
  disabledValue = 30;

  goBack() {
    this.router.navigate(['/showcase']);
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }
}
