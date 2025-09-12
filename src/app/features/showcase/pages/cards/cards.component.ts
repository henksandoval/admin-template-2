import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  private router = inject(Router);

  sampleProducts = [
    {
      title: 'Premium Plan',
      price: '$29.99',
      description: 'Perfect for growing businesses with advanced features.',
      features: ['Unlimited projects', 'Priority support', 'Analytics dashboard', 'API access']
    },
    {
      title: 'Basic Plan', 
      price: '$9.99',
      description: 'Great for individuals and small teams getting started.',
      features: ['5 projects', 'Email support', 'Basic analytics']
    },
    {
      title: 'Enterprise Plan',
      price: '$99.99',
      description: 'For large organizations with custom requirements.',
      features: ['Unlimited everything', 'Dedicated support', 'Custom integrations', 'SLA guarantee']
    }
  ];

  goBack() {
    this.router.navigate(['/showcase']);
  }

  onCardAction(action: string, item?: any) {
    console.log(`${action} clicked`, item ? `for ${item}` : '');
  }
}