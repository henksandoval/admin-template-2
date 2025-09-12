import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface FileNode {
  name: string;
  children?: FileNode[];
}

@Component({
  selector: 'app-layout-components',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatTreeModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './layout-components.component.html',
  styleUrl: './layout-components.component.scss'
})
export class LayoutComponentsComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  // Stepper forms
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  // Tree data
  treeControl = new NestedTreeControl<FileNode>((node: FileNode) => node.children);
  dataSource = new MatTreeNestedDataSource<FileNode>();

  // Grid list data
  tiles = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: 'lightyellow' },
  ];

  gridItems = [
    { title: 'Dashboard', subtitle: 'Analytics overview', icon: 'dashboard', color: '#1976d2' },
    { title: 'Users', subtitle: 'User management', icon: 'group', color: '#388e3c' },
    { title: 'Products', subtitle: 'Product catalog', icon: 'inventory', color: '#f57c00' },
    { title: 'Orders', subtitle: 'Order processing', icon: 'shopping_cart', color: '#7b1fa2' },
    { title: 'Reports', subtitle: 'Business reports', icon: 'assessment', color: '#d32f2f' },
    { title: 'Settings', subtitle: 'System settings', icon: 'settings', color: '#5d4037' },
  ];

  constructor() {
    // Initialize stepper forms
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.secondFormGroup = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });

    this.thirdFormGroup = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
      cardNumber: ['', Validators.required]
    });

    // Initialize tree data
    this.dataSource.data = [
      {
        name: 'src',
        children: [
          {
            name: 'app',
            children: [
              {
                name: 'components',
                children: [
                  { name: 'header.component.ts' },
                  { name: 'header.component.html' },
                  { name: 'sidebar.component.ts' }
                ]
              },
              {
                name: 'services',
                children: [
                  { name: 'user.service.ts' },
                  { name: 'auth.service.ts' }
                ]
              },
              { name: 'app.component.ts' },
              { name: 'app.module.ts' }
            ]
          },
          {
            name: 'assets',
            children: [
              { name: 'images' },
              { name: 'styles' }
            ]
          }
        ]
      },
      {
        name: 'dist',
        children: [
          { name: 'main.js' },
          { name: 'styles.css' }
        ]
      },
      { name: 'package.json' },
      { name: 'angular.json' }
    ];
  }

  goBack() {
    this.router.navigate(['/showcase']);
  }

  hasChild = (_: number, node: FileNode) => !!node.children && node.children.length > 0;

  onStepperComplete() {
    console.log('Stepper completed!', {
      personal: this.firstFormGroup.value,
      address: this.secondFormGroup.value,
      payment: this.thirdFormGroup.value
    });
  }

  onGridItemClick(item: any) {
    console.log('Grid item clicked:', item);
  }

  codeExamples = {
    stepper: `// Stepper Setup
<mat-stepper orientation="horizontal">
  <mat-step [stepControl]="firstFormGroup" label="Step 1">
    <form [formGroup]="firstFormGroup">
      <mat-form-field>
        <input matInput formControlName="field1">
      </mat-form-field>
      <button mat-button matStepperNext>Next</button>
    </form>
  </mat-step>
</mat-stepper>`,
    tree: `// Tree Setup
treeControl = new NestedTreeControl<FileNode>(node => node.children);
dataSource = new MatTreeNestedDataSource<FileNode>();

<mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
  <mat-tree-node *matTreeNodeDef="let node">
    <button mat-icon-button disabled></button>
    {{node.name}}
  </mat-tree-node>
  
  <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild">
    <button mat-icon-button matTreeNodeToggle>
      <mat-icon>expand_more</mat-icon>
    </button>
    {{node.name}}
    <ul>
      <ng-container matTreeNodeOutlet></ng-container>
    </ul>
  </mat-nested-tree-node>
</mat-tree>`,
    gridList: `// Grid List
<mat-grid-list cols="4" rowHeight="2:1">
  <mat-grid-tile *ngFor="let tile of tiles"
                 [colspan]="tile.cols"
                 [rowspan]="tile.rows">
    {{tile.text}}
  </mat-grid-tile>
</mat-grid-list>`
  };
}