import { Injectable, signal, computed, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NavigationItem } from '@layout/services/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  private _isDarkTheme = signal(false);
  private _currentRoute = signal('');

  readonly currentPageTitle = computed(() => {
    const route = this._currentRoute();
    if (route.includes('dashboard')) {
      return 'Dashboard';
    } else if (route.includes('showcase')) {
      return 'Components Showcase';
    }
    return 'Dashboard';
  });

  constructor(private router: Router) {
    this.initializeTheme();
    this.listenToRouteChanges();
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this._isDarkTheme.set(savedTheme === 'dark');
    } else {
      this._isDarkTheme.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }

  private listenToRouteChanges() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: NavigationEnd) => {
      this._currentRoute.set(event.url);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
