import { Component, Renderer2, effect, inject, signal, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
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
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
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
        // Mobile: Toggle mat-sidenav
        this.sidenav.toggle();
      } else {
        // Desktop: Toggle sidebar visibility (show/hide completely)
        this.navigationService.toggleSidebarVisible();
        if (this.navigationService.isSidebarVisible()) {
          this.sidenav.open();
        } else {
          this.sidenav.close();
        }
      }
    }).unsubscribe();
  }

  // Close mobile menu
  closeMobileMenu() {
    this.sidenav.close();
  }

  // Get sidenav mode based on screen size
  getSidenavMode(): Observable<'over' | 'side'> {
    return this.isHandset$.pipe(
      map(isHandset => isHandset ? 'over' : 'side')
    );
  }

  // Get sidenav opened state
  getSidenavOpened(): Observable<boolean> {
    return this.isHandset$.pipe(
      map(isHandset => {
        if (isHandset) {
          // Mobile: closed by default, opened via toggle
          return false;
        } else {
          // Desktop: opened based on visibility state
          return this.navigationService.isSidebarVisible();
        }
      })
    );
  }

  // Get sidebar CSS classes for width based on collapse state
  getSidebarClasses(): Observable<string> {
    return this.isHandset$.pipe(
      map(isHandset => {
        if (isHandset) {
          // Mobile: standard width
          return 'w-64';
        } else {
          // Desktop: width based on collapse state
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
