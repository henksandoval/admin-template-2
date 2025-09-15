import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidenavNavigationComponent} from '@layout/components/sidenav/components/sidenav-navigation.component';
import {SidenavHeaderComponent} from '@layout/components/sidenav/components/sidenav-header.component';
import {SidenavFooterComponent} from '@layout/components/sidenav/components/sidenav-footer.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    SidenavNavigationComponent,
    SidenavHeaderComponent,
    SidenavFooterComponent
  ],
  template: `
    <app-sidenav-header></app-sidenav-header>
    <div class="flex-1 overflow-y-auto">
      <app-sidenav-navigation></app-sidenav-navigation>
    </div>
    <app-sidenav-footer></app-sidenav-footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `]
})
export class SidenavComponent { }
