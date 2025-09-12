import { Component, Renderer2, effect, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {HeaderComponent} from '@layout/components/header/header.component';
import {SidebarComponent} from '@layout/components/sidebar/sidebar.component';
import {FooterComponent} from '@layout/components/footer/footer.component';
import {MainContentComponent} from '@layout/components/main-content/main-content.component';
import {LayoutService} from '@layout/services/layout.service';
import {ThemeService} from '@layout/services/theme/theme.service';
import { StickyHeaderDirective } from '@shared/directives/sticky-header.directive';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    HeaderComponent,
    SidebarComponent,
    MainContentComponent,
    FooterComponent,
    StickyHeaderDirective
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class AppLayoutComponent {
  headerHeight = 64;

  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private overlayContainer = inject(OverlayContainer);
  private breakpointObserver = inject(BreakpointObserver);
  public layoutService = inject(LayoutService);
  private themeService = inject(ThemeService);

  // Responsive breakpoint observable for MatSidenav
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor() {
    effect(() => {
      this.updateOverlayTheme();
    });
  }

  private updateOverlayTheme() {
    const overlayContainerElement = this.overlayContainer.getContainerElement();
    const isDark = this.themeService.isDarkMode();

    if (isDark) {
      this.renderer.addClass(overlayContainerElement, 'dark-theme');
      this.renderer.removeClass(overlayContainerElement, 'light-theme');
    } else {
      this.renderer.addClass(overlayContainerElement, 'light-theme');
      this.renderer.removeClass(overlayContainerElement, 'dark-theme');
    }
  }
}
