import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarHeaderComponent} from '@layout/components/sidebar/components/sidebar-header.component';
import {SidebarNavigationComponent} from '@layout/components/sidebar/components/sidebar-navigation.component';
import {SidebarSettingsComponent} from '@layout/components/sidebar/components/sidebar-settings.component';
import {SidebarFooterComponent} from '@layout/components/sidebar/components/sidebar-footer.component';
import {LayoutService} from '@layout/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarHeaderComponent,
    SidebarNavigationComponent,
    SidebarSettingsComponent,
    SidebarFooterComponent
  ],
  template: `
    <div class="h-full flex flex-col bg-inherit shadow-lg">
      <app-sidebar-header></app-sidebar-header>
      <div class="flex-1 overflow-hidden">
        <app-sidebar-navigation></app-sidebar-navigation>
      </div>
      <app-sidebar-settings></app-sidebar-settings>
      <app-sidebar-footer></app-sidebar-footer>
    </div>
  `,
  styles: []
})
export class SidebarComponent {
}
