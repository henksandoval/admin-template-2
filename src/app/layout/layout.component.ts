import { Component, Renderer2, effect, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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

  // Mobile menu state
  mobileMenuOpen = signal(false);

  // Responsive breakpoint observable
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

  // Handle menu toggle from header
  onMenuToggle() {
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        // Mobile: Toggle overlay menu
        this.mobileMenuOpen.set(!this.mobileMenuOpen());
      } else {
        // Desktop: Toggle sidebar visibility (show/hide completely)
        this.navigationService.toggleSidebarVisible();
      }
    }).unsubscribe();
  }

  // Close mobile menu
  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  // Determine if sidebar should be shown
  shouldShowSidebar(): Observable<boolean> {
    return this.isHandset$.pipe(
      map(isHandset => {
        if (isHandset) {
          // Mobile: show sidebar only if menu is open
          return this.mobileMenuOpen();
        } else {
          // Desktop: show sidebar if visible
          return this.navigationService.isSidebarVisible();
        }
      })
    );
  }

  // Get sidebar CSS classes
  getSidebarClasses(): Observable<string> {
    return this.isHandset$.pipe(
      map(isHandset => {
        if (isHandset) {
          // Mobile: overlay behavior
          return 'fixed left-0 top-16 bottom-0 w-64 z-50';
        } else {
          // Desktop: inline behavior based on collapse state
          const isCollapsed = this.navigationService.isSidebarCollapsed();
          return isCollapsed ? 'w-16' : 'w-64';
        }
      })
    );
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
