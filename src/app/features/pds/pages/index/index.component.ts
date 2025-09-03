import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-index',
    imports: [
      CommonModule,
      MatCardModule,
      MatButtonModule,
      MatIconModule
    ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  showcaseItems: ShowcaseItem[] = [
    {
      id: 'forms',
      title: 'Form Fields',
      description: 'Input fields, textareas, and form controls with various appearances and configurations.',
      icon: 'edit_note',
      route: '/showcase/forms',
      color: 'primary'
    },
  ];

  constructor(private router: Router) {}

  navigateToShowcase(route: string) {
    this.router.navigate([route]);
  }
}
