import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
  projects: number;
}

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent implements AfterViewInit {
  private router = inject(Router);

  // Basic table data
  basicColumns: string[] = ['name', 'email', 'role'];
  basicData: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: new Date('2024-01-15'), projects: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: new Date('2024-01-14'), projects: 3 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', lastLogin: new Date('2024-01-10'), projects: 2 }
  ];

  // Advanced table with sorting and pagination
  advancedColumns: string[] = ['select', 'id', 'name', 'email', 'role', 'status', 'lastLogin', 'projects', 'actions'];
  advancedDataSource = new MatTableDataSource<UserData>();
  selection = new SelectionModel<UserData>(true, []);

  @ViewChild('advancedPaginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Generate sample data
    this.advancedDataSource.data = this.generateSampleData();
  }

  ngAfterViewInit() {
    this.advancedDataSource.paginator = this.paginator;
    this.advancedDataSource.sort = this.sort;
  }

  goBack() {
    this.router.navigate(['/showcase']);
  }

  generateSampleData(): UserData[] {
    const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Davis', 
                  'Frank Miller', 'Grace Lee', 'Henry Wilson', 'Ivy Chen', 'Jack Thompson',
                  'Kate Johnson', 'Liam Brown', 'Maya Patel', 'Noah Williams', 'Olivia Taylor'];
    const roles = ['Admin', 'User', 'Editor', 'Viewer', 'Manager'];
    const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending'];
    
    return names.map((name, index) => ({
      id: index + 1,
      name: name,
      email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      projects: Math.floor(Math.random() * 10) + 1
    }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.advancedDataSource.filter = filterValue.trim().toLowerCase();

    if (this.advancedDataSource.paginator) {
      this.advancedDataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.advancedDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.advancedDataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'primary';
      case 'inactive': return 'warn';
      case 'pending': return 'accent';
      default: return 'basic';
    }
  }

  onRowAction(action: string, row: UserData) {
    console.log(`${action} action for user:`, row);
  }

  onBulkAction(action: string) {
    console.log(`${action} action for ${this.selection.selected.length} selected items:`, this.selection.selected);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }

  codeExamples = {
    basic: `// Basic Table Setup
dataSource = new MatTableDataSource(data);
displayedColumns = ['name', 'email', 'role'];

<table mat-table [dataSource]="dataSource">
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef>Name</th>
    <td mat-cell *matCellDef="let user">{{user.name}}</td>
  </ng-container>
  
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>`,
    advanced: `// With Sorting and Pagination
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

<table mat-table [dataSource]="dataSource" matSort>
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>
      Name
    </th>
    <td mat-cell *matCellDef="let user">{{user.name}}</td>
  </ng-container>
</table>

<mat-paginator [pageSizeOptions]="[5, 10, 20]">
</mat-paginator>`,
    selection: `// Selection Model
selection = new SelectionModel<UserData>(true, []);

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}`
  };
}