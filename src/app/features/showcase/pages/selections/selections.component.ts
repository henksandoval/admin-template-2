import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selections',
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './selections.component.html',
  styleUrl: './selections.component.scss'
})
export class SelectionsComponent {
  private router = inject(Router);

  isToggled = false;
  selectedFontStyle = 'bold';
  selectedItems: string[] = ['bold', 'underline'];

  goBack() {
    this.router.navigate(['/showcase']);
  }
}
