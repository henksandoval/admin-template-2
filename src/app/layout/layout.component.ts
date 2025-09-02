import { Component, ViewChild, Renderer2, Inject, effect, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import {HeaderComponent} from '@layout/components/header/header.component';
import {SidebarComponent} from '@layout/components/sidebar/sidebar.component';
import {FooterComponent} from '@layout/components/footer/footer.component';
import {MainContentComponent} from '@layout/components/main-content/main-content.component';
import {LayoutService} from '@layout/services/layout.service';
import {ThemeService} from '@layout/services/theme/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    MainContentComponent,
    FooterComponent
  ],
  template: `
    <!-- Layout principal con header sticky moderno -->
    <div class="min-h-screen flex flex-col">

      <!-- Header Component - Sticky header que se oculta/muestra inteligentemente -->
      <div class="sticky top-0 z-50 transition-transform duration-300" id="header-container">
        <app-header
          (menuToggle)="layoutService.toggleSidebarVisible()">
        </app-header>
      </div>

      <!-- Container principal con sidebar fijo -->
      <div class="flex flex-1 relative">

        <!-- Sidebar fijo con scroll interno - estilo GitHub -->
        <div *ngIf="layoutService.isSidebarVisible()"
             class="fixed left-0 z-40 transition-all duration-300 ease-in-out fixed-sidebar"
             [style.width.px]="layoutService.sidebarWidth()"
             [style.top.px]="isHeaderVisible() ? headerHeight : 0"
             [style.height]="isHeaderVisible() ? 'calc(100vh - ' + headerHeight + 'px)' : '100vh'">

          <!-- Sidebar Component con scroll interno -->
          <div class="h-full overflow-y-auto overflow-x-hidden sidebar-scroll">
            <app-sidebar></app-sidebar>
          </div>
        </div>

        <!-- Main Content Area con margen dinámico -->
        <div class="flex-1 transition-all duration-300 ease-in-out"
             [style.margin-left.px]="layoutService.isSidebarVisible() ? layoutService.sidebarWidth() : 0"
             [style.margin-top.px]="headerHeight">

          <!-- Main Content Component -->
          <div class="min-h-screen bg-surface">
            <app-main-content></app-main-content>

            <!-- Footer como parte del contenido scrollable -->
            <app-footer></app-footer>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: var(--mat-sys-background);
      color: var(--mat-sys-on-background);
    }

    /* Sticky header moderno */
    #header-container {
      transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      will-change: transform;
    }

    /* ===== SCROLL STYLES PREMIUM ===== */

    /* Sidebar scroll - Estilo GitHub premium */
    .sidebar-scroll {
      scrollbar-width: thin;
      scrollbar-color: rgba(var(--mat-sys-primary-rgb), 0.2) transparent;
      scroll-behavior: smooth;
    }

    .sidebar-scroll::-webkit-scrollbar {
      width: 8px;
    }

    .sidebar-scroll::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 4px;
    }

    .sidebar-scroll::-webkit-scrollbar-thumb {
      background: linear-gradient(
        135deg,
        rgba(var(--mat-sys-primary-rgb), 0.3) 0%,
        rgba(var(--mat-sys-primary-rgb), 0.5) 50%,
        rgba(var(--mat-sys-primary-rgb), 0.3) 100%
      );
      border-radius: 4px;
      border: 1px solid rgba(var(--mat-sys-primary-rgb), 0.1);
      transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .sidebar-scroll::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(
        135deg,
        rgba(var(--mat-sys-primary-rgb), 0.5) 0%,
        rgba(var(--mat-sys-primary-rgb), 0.7) 50%,
        rgba(var(--mat-sys-primary-rgb), 0.5) 100%
      );
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      transform: scaleY(1.1);
    }

    .sidebar-scroll::-webkit-scrollbar-thumb:active {
      background: linear-gradient(
        135deg,
        rgba(var(--mat-sys-primary-rgb), 0.6) 0%,
        rgba(var(--mat-sys-primary-rgb), 0.8) 50%,
        rgba(var(--mat-sys-primary-rgb), 0.6) 100%
      );
    }

    /* Scroll global de la aplicación */
    :global(html) {
      scrollbar-width: thin;
      scrollbar-color: rgba(var(--mat-sys-outline-rgb), 0.3) transparent;
      scroll-behavior: smooth;
    }

    :global(body)::-webkit-scrollbar {
      width: 10px;
    }

    :global(body)::-webkit-scrollbar-track {
      background: var(--mat-sys-surface-container-lowest);
      border-radius: 5px;
    }

    :global(body)::-webkit-scrollbar-thumb {
      background: linear-gradient(
        180deg,
        rgba(var(--mat-sys-outline-rgb), 0.3) 0%,
        rgba(var(--mat-sys-outline-rgb), 0.5) 50%,
        rgba(var(--mat-sys-outline-rgb), 0.3) 100%
      );
      border-radius: 5px;
      border: 1px solid rgba(var(--mat-sys-outline-rgb), 0.1);
      transition: all 0.3s ease;
    }

    :global(body)::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(
        180deg,
        rgba(var(--mat-sys-outline-rgb), 0.4) 0%,
        rgba(var(--mat-sys-outline-rgb), 0.6) 50%,
        rgba(var(--mat-sys-outline-rgb), 0.4) 100%
      );
      transform: scaleX(1.2);
    }

    /* ===== EFECTOS VISUALES AVANZADOS ===== */

    /* Fade superior e inferior para el sidebar */
    .sidebar-scroll::before,
    .sidebar-scroll::after {
      content: '';
      position: sticky;
      display: block;
      height: 20px;
      z-index: 10;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .sidebar-scroll::before {
      top: 0;
      background: linear-gradient(
        to bottom,
        var(--mat-sys-surface) 0%,
        rgba(var(--mat-sys-surface-rgb), 0.8) 50%,
        transparent 100%
      );
      margin-bottom: -20px;
    }

    .sidebar-scroll::after {
      bottom: 0;
      background: linear-gradient(
        to top,
        var(--mat-sys-surface) 0%,
        rgba(var(--mat-sys-surface-rgb), 0.8) 50%,
        transparent 100%
      );
      margin-top: -20px;
    }

    /* Glow effect para scroll activo */
    .sidebar-scroll:hover {
      box-shadow: inset 2px 0 4px rgba(var(--mat-sys-primary-rgb), 0.1);
    }

    /* Responsive para móviles */
    @media (max-width: 768px) {
      .fixed-sidebar {
        position: fixed !important;
        left: -100% !important;
        transition: left 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        z-index: 50;
        box-shadow: 2px 0 10px rgba(0,0,0,0.3);
      }

      .fixed-sidebar.mobile-open {
        left: 0 !important;
      }

      /* Scroll más sutil en móvil */
      .sidebar-scroll::-webkit-scrollbar {
        width: 4px;
      }
    }

    /* ===== ANIMACIONES MICRO-INTERACCIONES ===== */

    @keyframes scrollGlow {
      0% { box-shadow: inset 2px 0 4px rgba(var(--mat-sys-primary-rgb), 0.1); }
      50% { box-shadow: inset 2px 0 8px rgba(var(--mat-sys-primary-rgb), 0.2); }
      100% { box-shadow: inset 2px 0 4px rgba(var(--mat-sys-primary-rgb), 0.1); }
    }

    .sidebar-scroll:active {
      animation: scrollGlow 0.6s ease-in-out;
    }

    /* Tema oscuro - ajustes especiales */
    :host-context(.dark) .sidebar-scroll::-webkit-scrollbar-thumb {
      border: 1px solid rgba(var(--mat-sys-primary-rgb), 0.2);
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    :host-context(.dark) :global(body)::-webkit-scrollbar-track {
      background: var(--mat-sys-surface-container-high);
    }
  `]
})
export class AppLayoutComponent {
  // Propiedades para layout moderno
  headerHeight = 64; // Altura típica de Material Design header
  isHeaderVisible = signal(true); // Signal para controlar visibilidad del header
  private lastScrollTop = 0;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private overlayContainer: OverlayContainer,
    public layoutService: LayoutService,
    private themeService: ThemeService
  ) {
    // Effect para aplicar el tema cuando cambie - ahora usando ThemeService
    effect(() => {
      // El ThemeService ya maneja la aplicación de temas automáticamente
      this.updateOverlayTheme();
    });

    // Configurar sticky header inteligente
    this.setupStickyHeader();
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

  private setupStickyHeader() {
    // Configurar comportamiento del sticky header moderno
    if (typeof window !== 'undefined') {
      let ticking = false;

      const updateHeader = () => {
        const scrollTop = window.pageYOffset || this.document.documentElement.scrollTop;
        const headerContainer = this.document.getElementById('header-container');

        if (headerContainer) {
          if (scrollTop > this.lastScrollTop && scrollTop > this.headerHeight) {
            // Scrolling down & past header height - hide header
            this.renderer.setStyle(headerContainer, 'transform', 'translateY(-100%)');
            this.isHeaderVisible.set(false);
          } else {
            // Scrolling up or at top - show header
            this.renderer.setStyle(headerContainer, 'transform', 'translateY(0)');
            this.isHeaderVisible.set(true);
          }
        }

        this.lastScrollTop = scrollTop;
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateHeader);
          ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }
}
