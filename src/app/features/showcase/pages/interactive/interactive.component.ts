import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interactive',
  imports: [
    CommonModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './interactive.component.html',
  styleUrl: './interactive.component.scss'
})
export class InteractiveComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog);

  goBack() {
    this.router.navigate(['/showcase']);
  }

  openDialog() {
    alert('Dialog would open here! In a real app, you would use MatDialog.open() with a component.');
  }
}
