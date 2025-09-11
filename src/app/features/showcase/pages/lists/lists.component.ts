import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent {
  private router = inject(Router);

  contacts = [
    { name: 'John Doe', email: 'john.doe@example.com', phone: '+1 234 567 8900' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 234 567 8901' },
    { name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '+1 234 567 8902' }
  ];

  goBack() {
    this.router.navigate(['/showcase']);
  }
}
