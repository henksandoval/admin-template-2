import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress',
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  
  progress = 0;
  buffer = 10;
  private intervalId: any;

  ngOnInit() {
    // Simulate progress
    this.intervalId = setInterval(() => {
      this.progress += Math.random() * 4;
      this.buffer += Math.random() * 4;
      
      if (this.progress > 100) {
        this.progress = 0;
        this.buffer = 10;
      }
    }, 200);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  goBack() {
    this.router.navigate(['/showcase']);
  }
}
