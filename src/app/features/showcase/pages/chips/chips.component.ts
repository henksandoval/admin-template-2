import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chips',
  imports: [
    CommonModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  private router = inject(Router);

  fruits: string[] = ['Lemon', 'Lime', 'Apple', 'Orange'];
  fruit: string = 'example'; // For code example template variable
  selectedChips = new Set(['Apple']);
  Array = Array; // Make Array available in template
  
  goBack() {
    this.router.navigate(['/showcase']);
  }

  removeChip(fruit: string): void {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  toggleChip(chip: string): void {
    if (this.selectedChips.has(chip)) {
      this.selectedChips.delete(chip);
    } else {
      this.selectedChips.add(chip);
    }
  }
}
