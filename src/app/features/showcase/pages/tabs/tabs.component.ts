import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  private router = inject(Router);

  selectedTabIndex = 0;
  tab = { content: 'example' }; // For code example
  dynamicTabs = [
    { label: 'First', content: 'Content of the first tab' },
    { label: 'Second', content: 'Content of the second tab' },
    { label: 'Third', content: 'Content of the third tab' }
  ];

  goBack() {
    this.router.navigate(['/showcase']);
  }

  addTab() {
    this.dynamicTabs.push({
      label: `Tab ${this.dynamicTabs.length + 1}`,
      content: `Content of tab ${this.dynamicTabs.length + 1}`
    });
  }

  removeTab(index: number) {
    this.dynamicTabs.splice(index, 1);
  }
}
