import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobmagnetic',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './jobmagnetic.component.html',
  styleUrl: './jobmagnetic.component.scss'
})
export class JobmagneticComponent {
  private router = inject(Router);

  goBack() {
    this.router.navigate(['/showcase']);
  }
}
