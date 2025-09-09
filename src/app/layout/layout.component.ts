import { Component, ViewChild, Renderer2, Inject, effect } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import {HeaderComponent} from '@layout/components/header/header.component';
import {SidebarComponent} from '@layout/components/sidebar/sidebar.component';
import {FooterComponent} from '@layout/components/footer/footer.component';
import {MainContentComponent} from '@layout/components/main-content/main-content.component';
import {LayoutService} from '@layout/services/layout.service';
import {ThemeService} from '@layout/services/theme/theme.service';
import {NavigationService} from '@layout/services/navigation/navigation.service';
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

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private overlayContainer: OverlayContainer,
    public layoutService: LayoutService,
    public navigationService: NavigationService,
    private themeService: ThemeService
  ) {
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
