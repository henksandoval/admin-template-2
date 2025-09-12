import { Component, Renderer2, effect, inject, computed } from '@angular/core';
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
import {NavigationService} from '@layout/services/navigation/navigation.service';
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
  public navigationService = inject(NavigationService);
  private themeService = inject(ThemeService);

  // Responsive breakpoint observable for MatSidenav
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // Computed sidebar width in pixels based on visibility and collapse state
  sidebarWidthPx = computed(() => {
    return this.navigationService.sidebarWidth();
  });

  constructor() {
    effect(() => {
      this.updateOverlayTheme();
    });
  }

  onMenuToggle(sidenav: any) {
    // For mobile (handset), toggle the sidenav open/close
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        sidenav.toggle();
      } else {
        // For desktop, toggle the sidebar visibility (hide/show completely)
        this.navigationService.toggleSidebarVisible();
      }
    }).unsubscribe();
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
