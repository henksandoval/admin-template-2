import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expansion',
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './expansion.component.html',
  styleUrl: './expansion.component.scss'
})
export class ExpansionComponent {
  private router = inject(Router);

  panelOpenState = false;
  step = 0;

  goBack() {
    this.router.navigate(['/showcase']);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
