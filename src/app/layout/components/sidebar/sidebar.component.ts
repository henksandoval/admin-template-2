import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarHeaderComponent} from '@layout/components/sidebar/components/sidebar-header.component';
import {SidebarNavigationComponent} from '@layout/components/sidebar/components/sidebar-navigation.component';
import {SidebarFooterComponent} from '@layout/components/sidebar/components/sidebar-footer.component';
import {LayoutService} from '@layout/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarHeaderComponent,
    SidebarNavigationComponent,
    SidebarFooterComponent
  ],
  template: `
    <div class="sidebar-container">
      <app-sidebar-header></app-sidebar-header>
      <div class="navigation-area flex-1">
        <app-sidebar-navigation></app-sidebar-navigation>
      </div>
      <app-sidebar-footer></app-sidebar-footer>
    </div>
  `,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
}
