import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-selections',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatNativeDateModule
  ],
  templateUrl: './selections.component.html',
  styleUrl: './selections.component.scss'
})
export class SelectionsComponent {
  private router = inject(Router);

  // Slide toggle properties
  isToggled = false;
  selectedFontStyle = 'bold';
  selectedItems: string[] = ['bold', 'underline'];

  // Select dropdown properties
  selectedFood = 'pizza';
  selectedCountries: string[] = ['usa', 'canada'];
  
  foods = [
    { value: 'steak', viewValue: 'Steak' },
    { value: 'pizza', viewValue: 'Pizza' },
    { value: 'tacos', viewValue: 'Tacos' },
    { value: 'burgers', viewValue: 'Burgers' },
    { value: 'sushi', viewValue: 'Sushi' }
  ];

  countries = [
    { value: 'usa', viewValue: 'United States' },
    { value: 'canada', viewValue: 'Canada' },
    { value: 'uk', viewValue: 'United Kingdom' },
    { value: 'germany', viewValue: 'Germany' },
    { value: 'france', viewValue: 'France' },
    { value: 'spain', viewValue: 'Spain' },
    { value: 'italy', viewValue: 'Italy' },
    { value: 'japan', viewValue: 'Japan' }
  ];

  // Datepicker properties
  selectedDate = new Date();
  startDate = new Date();
  endDate = new Date();

  // Autocomplete properties
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions: Observable<string[]>;

  cityControl = new FormControl('');
  cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis',
    'Seattle', 'Denver', 'Washington', 'Boston', 'Las Vegas', 'Nashville'
  ];
  filteredCities: Observable<string[]>;

  constructor() {
    // Setup autocomplete filtering
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.toLowerCase().includes(filterValue));
  }

  goBack() {
    this.router.navigate(['/showcase']);
  }

  get codeExample(): string {
    return `// Basic select dropdown
<mat-form-field appearance="outline">
  <mat-label>Favorite food</mat-label>
  <mat-select [(value)]="selectedFood">
    <mat-option *ngFor="let food of foods" [value]="food.value">
      {{food.viewValue}}
    </mat-option>
  </mat-select>
</mat-form-field>

// Autocomplete with filtering
<mat-form-field appearance="outline">
  <mat-label>Choose option</mat-label>
  <input matInput [formControl]="myControl" [matAutocomplete]="auto">
  <mat-autocomplete #auto="matAutocomplete">
    <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
      {{option}}
    </mat-option>
  </mat-autocomplete>
</mat-form-field>

// Date picker
<mat-form-field appearance="outline">
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker" [(ngModel)]="selectedDate">
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>

// Date range picker
<mat-form-field appearance="outline">
  <mat-label>Enter a date range</mat-label>
  <mat-date-range-input [rangePicker]="rangePicker">
    <input matStartDate placeholder="Start date">
    <input matEndDate placeholder="End date">
  </mat-date-range-input>
  <mat-datepicker-toggle matIconSuffix [for]="rangePicker"></mat-datepicker-toggle>
  <mat-date-range-picker #rangePicker></mat-date-range-picker>
</mat-form-field>

// Slide toggle
<mat-slide-toggle [(ngModel)]="isToggled">
  Slide me!
</mat-slide-toggle>

// Button toggle group
<mat-button-toggle-group [(value)]="selectedFontStyle">
  <mat-button-toggle value="bold">Bold</mat-button-toggle>
  <mat-button-toggle value="italic">Italic</mat-button-toggle>
</mat-button-toggle-group>`;
  }
}
