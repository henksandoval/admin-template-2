import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'error' | 'success';
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="dialog-container">
      <div mat-dialog-title class="flex items-center">
        <mat-icon class="mr-3" [ngClass]="getIconClass()">{{ getIcon() }}</mat-icon>
        <span>{{ data.title }}</span>
      </div>
      
      <div mat-dialog-content class="py-4">
        <p>{{ data.message }}</p>
      </div>
      
      <div mat-dialog-actions class="flex justify-end gap-2">
        <button mat-button (click)="onCancel()">
          {{ data.cancelText || 'Cancel' }}
        </button>
        <button mat-raised-button [color]="getButtonColor()" (click)="onConfirm()">
          {{ data.confirmText || 'Confirm' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 0;
    }
    
    .text-red-500 { color: #ef4444; }
    .text-orange-500 { color: #f97316; }
    .text-blue-500 { color: #3b82f6; }
    .text-green-500 { color: #10b981; }
  `]
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  getIcon(): string {
    switch (this.data.type) {
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'success': return 'check_circle';
      default: return 'info';
    }
  }

  getIconClass(): string {
    switch (this.data.type) {
      case 'warning': return 'text-orange-500';
      case 'error': return 'text-red-500';
      case 'success': return 'text-green-500';
      default: return 'text-blue-500';
    }
  }

  getButtonColor(): string {
    switch (this.data.type) {
      case 'warning': return 'accent';
      case 'error': return 'warn';
      case 'success': return 'primary';
      default: return 'primary';
    }
  }
}