import { Directive, Inject, signal, effect, ElementRef, Renderer2, OnDestroy, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appStickyHeader]',
  standalone: true
})
export class StickyHeaderDirective implements OnDestroy {
  private headerHeight = 64;
  private lastScrollTop = 0;
  private isHeaderVisible = signal(true);
  private scrollListener?: () => void;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  constructor() {
    this.setupStickyHeader();
  }

  private setupStickyHeader() {
    if (typeof window !== 'undefined') {
      let ticking = false;

      const updateHeader = () => {
        const scrollTop = window.pageYOffset || this.document.documentElement.scrollTop;
        const headerContainer = this.el.nativeElement;

        if (headerContainer) {
          if (scrollTop > this.lastScrollTop && scrollTop > this.headerHeight) {
            this.renderer.setStyle(headerContainer, 'transform', 'translateY(-100%)');
            this.isHeaderVisible.set(false);
          } else {
            this.renderer.setStyle(headerContainer, 'transform', 'translateY(0)');
            this.isHeaderVisible.set(true);
          }
        }

        this.lastScrollTop = scrollTop;
        ticking = false;
      };

      this.scrollListener = () => {
        if (!ticking) {
          requestAnimationFrame(updateHeader);
          ticking = true;
        }
      };

      window.addEventListener('scroll', this.scrollListener, { passive: true });
    }
  }

  getHeaderVisibility() {
    return this.isHeaderVisible();
  }

  ngOnDestroy() {
    if (this.scrollListener && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
}