import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheetModule, MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog.component';
import { FormDialogComponent } from './dialogs/form-dialog.component';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatBottomSheetModule
  ],
  template: `
    <mat-nav-list>
      <h3 mat-subheader>Quick Actions</h3>
      <a mat-list-item (click)="openLink('create')">
        <mat-icon matListItemIcon>add</mat-icon>
        <span matListItemTitle>Create New Item</span>
        <span matListItemLine>Add a new item to your collection</span>
      </a>
      <a mat-list-item (click)="openLink('share')">
        <mat-icon matListItemIcon>share</mat-icon>
        <span matListItemTitle>Share</span>
        <span matListItemLine>Share this content with others</span>
      </a>
      <a mat-list-item (click)="openLink('favorite')">
        <mat-icon matListItemIcon>favorite</mat-icon>
        <span matListItemTitle>Add to Favorites</span>
        <span matListItemLine>Save to your favorites list</span>
      </a>
      <a mat-list-item (click)="openLink('download')">
        <mat-icon matListItemIcon>download</mat-icon>
        <span matListItemTitle>Download</span>
        <span matListItemLine>Download content offline</span>
      </a>
    </mat-nav-list>
  `
})
export class BottomSheetComponent {
  private bottomSheetRef = inject(MatBottomSheet);

  openLink(action: string): void {
    console.log(`Bottom sheet action: ${action}`);
    this.bottomSheetRef.dismiss();
  }
}

@Component({
  selector: 'app-popups-overlays',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './popups-overlays.component.html',
  styleUrl: './popups-overlays.component.scss'
})
export class PopupsOverlaysComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private bottomSheet = inject(MatBottomSheet);

  goBack() {
    this.router.navigate(['/showcase']);
  }

  // Dialog methods
  openBasicDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Basic Dialog',
        message: 'This is a basic dialog with a simple message.',
        confirmText: 'OK',
        cancelText: 'Cancel',
        type: 'info'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Basic dialog was closed', result);
      if (result) {
        this.showSnackbar('Dialog confirmed!', 'success');
      }
    });
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Action',
        message: 'Are you sure you want to delete this item? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'error'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showSnackbar('Item deleted successfully', 'success');
      }
    });
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: {
        title: 'Create New User'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User created:', result);
        this.showSnackbar(`User ${result.name} created successfully!`, 'success');
      }
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: {
        title: 'Edit User',
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'manager'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User updated:', result);
        this.showSnackbar(`User ${result.name} updated successfully!`, 'success');
      }
    });
  }

  // Snackbar methods
  showBasicSnackbar() {
    this.snackBar.open('This is a basic snackbar message', 'Close', {
      duration: 3000
    });
  }

  showSnackbar(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: [`snackbar-${type}`],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  showActionSnackbar() {
    const snackBarRef = this.snackBar.open('Message sent successfully!', 'Undo', {
      duration: 5000
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('Undo action clicked');
      this.showSnackbar('Action undone!', 'info');
    });
  }

  showCustomSnackbar() {
    this.snackBar.open('🎉 Custom styled snackbar with emoji!', 'Got it!', {
      duration: 4000,
      panelClass: ['custom-snackbar']
    });
  }

  // Bottom Sheet methods
  openBottomSheet() {
    const bottomSheetRef = this.bottomSheet.open(BottomSheetComponent);

    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet was dismissed');
    });
  }

  openListBottomSheet() {
    this.bottomSheet.open(BottomSheetComponent);
  }

  codeExamples = {
    dialog: `// Dialog
const dialogRef = this.dialog.open(MyDialogComponent, {
  width: '400px',
  data: { message: 'Hello!' }
});

dialogRef.afterClosed().subscribe(result => {
  console.log('Dialog closed', result);
});`,
    snackbar: `// Snackbar
this.snackBar.open('Message sent!', 'Undo', {
  duration: 3000,
  horizontalPosition: 'end',
  verticalPosition: 'top'
});`,
    bottomSheet: `// Bottom Sheet
const bottomSheetRef = this.bottomSheet.open(MyBottomSheetComponent);

bottomSheetRef.afterDismissed().subscribe(() => {
  console.log('Bottom sheet dismissed');
});`,
    dialogComponent: `// Dialog Component
@Component({
  selector: 'my-dialog',
  template: \`
    <h2 mat-dialog-title>Title</h2>
    <div mat-dialog-content>Content</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  \`
})
export class MyDialogComponent { }`
  };
}