import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TextInputDirective } from '@shared/atoms/text-input.directive';
import { FormFieldDirective } from '@shared/atoms/form-field.directive';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {FormFieldInputComponent} from '@shared/molecules/form-field-input/form-field-input.component';
import {FormFieldInputOptions} from '@shared/molecules/form-field-input/form-field-input.model';
import {TextInputConfig} from '@shared/atoms/models/text-input-config.model';
import {ControlConnectorDirective} from '@shared/molecules/form-field-input/control-connector.directive';

@Component({
  selector: 'app-basic-forms',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TextInputDirective,
    FormFieldDirective,
    ReactiveFormsModule,
    FormFieldInputComponent,
    ControlConnectorDirective
  ],
  template: `
    <div class="p-6">
      <!-- Header -->
      <div class="mb-6">
        <button mat-button (click)="goBack()" class="mb-4" style="color: var(--mat-sys-primary);">
          <mat-icon class="mr-2">arrow_back</mat-icon>
          Back to Showcase
        </button>
        <h1 class="text-3xl font-bold mb-2" style="color: var(--mat-sys-primary);">
          📝 Basic Form Fields (Atomic Design)
        </h1>
        <p class="text-lg" style="color: var(--mat-sys-on-surface-variant);">
          Input fields with atomic design directives
        </p>
      </div>

      <!-- Basic Form Fields -->
      <mat-card class="mb-8 shadow-lg">
        <mat-card-header>
          <mat-card-title class="text-xl font-semibold">Basic Form Fields</mat-card-title>
          <mat-card-subtitle>Essential input components for forms</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="p-6">
          <!-- IMPORTANTE: El form debe tener [formGroup] -->
          <form [formGroup]="form" class="min-w-[150px] max-w-[500px] w-full">

            <!-- Campo simple sin validación -->
            <mat-form-field appFormField>
              <mat-label>Favorite food</mat-label>
              <input matInput appTextInput placeholder="Ex. Pizza">
            </mat-form-field>

            <!-- Campo simple con validación -->
            <mat-form-field appFormField>
              <mat-label>Favorite food</mat-label>
              <input matInput appTextInput placeholder="Ex. Pizza" required>
            </mat-form-field>

            <mat-form-field appFormField>
              <mat-label>Nombre completo</mat-label>
              <input
                matInput
                appTextInput
                formControlName="fullName"
                [config]="fullNameInputConfig"
              >
              <mat-error *ngIf="getControl('fullName').hasError('required')">
                El nombre es requerido.
              </mat-error>
              <mat-error *ngIf="getControl('fullName').hasError('minlength')">
                El nombre debe tener al menos 3 caracteres.
              </mat-error>
            </mat-form-field>

            <app-form-field-input
              formControlName="fullNameWrapper"
              [config]="fullNameConfig"
              appControlConnector>
            </app-form-field-input>

          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class BasicFormsComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {}

  get fullNameInputConfig(): TextInputConfig {
    const control = this.getControl('fullName');
    return {
      placeholder: 'Ej. Juan Pérez',
      ariaLabel: 'Nombre completo',
      hasError: control.invalid && (control.touched || control.dirty)
    };
  }

  fullNameConfig: FormFieldInputOptions = {
    label: 'Nombre completo',
    placeholder: 'Ej. Juan Pérez Wrapper',
    hint: 'Este es un campo de texto con validación usando un componente wrapper.',
    icon: 'person',
    ariaLabel: 'Nombre completo (componente wrapper)',
    appearance: 'fill',
    errorMessages: {
      required: 'El nombre es requerido (desde config).',
      minlength: 'El nombre debe tener al menos 3 caracteres (desde config).'
    }
  };

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      fullNameWrapper: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: [''],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      disabledField: [{ value: 'Valor predefinido', disabled: true }]
    });
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  goBack(): void {
    this.router.navigate(['/pds']);
  }
}
