import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <footer class="p-4 text-center bg-surface border-t border-outline-variant">
      <p class="text-sm mat-caption">
        © 2024 JobMagnetic Admin. Built with Angular 19 + Material Design 3.
      </p>
    </footer>
  `,
  styles: []
})
export class FooterComponent { }
