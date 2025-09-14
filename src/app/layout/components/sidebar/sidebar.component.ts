import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarHeaderComponent} from '@layout/components/sidebar/components/sidebar-header.component';
import {SidebarNavigationComponent} from '@layout/components/sidebar/components/sidebar-navigation.component';
import {SidebarFooterComponent} from '@layout/components/sidebar/components/sidebar-footer.component';

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
    <app-sidebar-header></app-sidebar-header>
    <div class="flex-1 overflow-y-auto">
      <app-sidebar-navigation></app-sidebar-navigation>
    </div>
    <app-sidebar-footer></app-sidebar-footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `]
})
export class SidebarComponent { }
