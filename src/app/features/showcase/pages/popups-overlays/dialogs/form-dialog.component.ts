import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

export interface FormDialogData {
  title: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>{{ data.title }}</h2>
      
      <div mat-dialog-content class="py-4">
        <form [formGroup]="userForm" class="space-y-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter full name">
            <mat-error *ngIf="userForm.get('name')?.hasError('required')">
              Name is required
            </mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" placeholder="Enter email address">
            <mat-error *ngIf="userForm.get('email')?.hasError('required')">
              Email is required
            </mat-error>
            <mat-error *ngIf="userForm.get('email')?.hasError('email')">
              Please enter a valid email
            </mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Role</mat-label>
            <mat-select formControlName="role">
              <mat-option value="admin">Admin</mat-option>
              <mat-option value="manager">Manager</mat-option>
              <mat-option value="editor">Editor</mat-option>
              <mat-option value="user">User</mat-option>
              <mat-option value="viewer">Viewer</mat-option>
            </mat-select>
            <mat-error *ngIf="userForm.get('role')?.hasError('required')">
              Role is required
            </mat-error>
          </mat-form-field>
        </form>
      </div>
      
      <div mat-dialog-actions class="flex justify-end gap-2">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" [disabled]="userForm.invalid" (click)="onSave()">
          {{ data.user ? 'Update' : 'Create' }} User
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      min-width: 400px;
      padding: 0;
    }
  `]
})
export class FormDialogComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: [data.user?.name || '', Validators.required],
      email: [data.user?.email || '', [Validators.required, Validators.email]],
      role: [data.user?.role || '', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}