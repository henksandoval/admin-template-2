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
    FormFieldInputComponent
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

            <!-- Campo con validación -->
            <mat-form-field appFormField>
              <mat-label>Nombre completo</mat-label>
              <input
                matInput
                appTextInput
                formControlName="fullName"
                placeholder="Ej. Juan Pérez"
                ariaLabel="Nombre completo"
                [hasError]="getControl('fullName').invalid && getControl('fullName').touched">
              <mat-error *ngIf="getControl('fullName').hasError('required')">
                El nombre es requerido.
              </mat-error>
              <mat-error *ngIf="getControl('fullName').hasError('minlength')">
                El nombre debe tener al menos 3 caracteres.
              </mat-error>
            </mat-form-field>

            <app-form-field-input
              formControlName="fullNameWrapper"
              type="text"
              ariaLabel="Nombre completo (componente wrapper)"
              label="Nombre completo"
              placeholder="Ej. Juan Pérez Wrapper"
              hint="Este es un campo de texto con validación usando un componente wrapper."
              icon="person"
              [errorMessages]="{
              required: 'El nombre es requerido.',
              minlength: 'El nombre debe tener al menos 3 caracteres.'
            }">
            </app-form-field-input>

            <!-- Email con validación -->
            <mat-form-field appFormField>
              <mat-label>Email</mat-label>
              <input
                matInput
                appTextInput
                type="email"
                formControlName="email"
                placeholder="usuario@ejemplo.com"
                ariaLabel="Correo electrónico"
                [hasError]="getControl('email').invalid && getControl('email').touched">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="getControl('email').hasError('required')">
                El email es requerido.
              </mat-error>
              <mat-error *ngIf="getControl('email').hasError('email')">
                Por favor ingrese un email válido.
              </mat-error>
            </mat-form-field>

            <!-- Password -->
            <mat-form-field appFormField>
              <mat-label>Contraseña</mat-label>
              <input
                matInput
                appTextInput
                type="password"
                formControlName="password"
                placeholder="Mínimo 8 caracteres"
                [hasError]="getControl('password').invalid && getControl('password').touched">
              <mat-icon matSuffix>lock</mat-icon>
              <mat-error *ngIf="getControl('password').hasError('required')">
                La contraseña es requerida.
              </mat-error>
              <mat-error *ngIf="getControl('password').hasError('minlength')">
                La contraseña debe tener al menos 8 caracteres.
              </mat-error>
            </mat-form-field>

            <!-- Diferentes apariencias -->
            <h3 class="text-lg font-medium mb-3 mt-6">Apariencias</h3>

            <mat-form-field appFormField appearance="outline">
              <mat-label>Outline appearance</mat-label>
              <input matInput appTextInput placeholder="Placeholder">
            </mat-form-field>

            <!-- Botones -->
            <div class="flex gap-4 mt-6">
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="form.invalid"
                (click)="onSubmit()">
                Enviar
              </button>
              <button
                mat-stroked-button
                type="button"
                (click)="onReset()">
                Limpiar
              </button>
            </div>

            <!-- Debug: Estado del formulario -->
            <div class="mt-6 p-4 bg-gray-100 rounded" *ngIf="showFormState">
              <h3 class="font-semibold mb-2">Estado del formulario:</h3>
              <pre class="text-sm">{{ form.value | json }}</pre>
              <p class="text-sm mt-2">
                Válido: <span [class.text-green-600]="form.valid" [class.text-red-600]="!form.valid">
                  {{ form.valid ? 'Sí' : 'No' }}
                </span>
              </p>
            </div>
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
  public showFormState = false;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {}

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

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
      this.showFormState = true;
    }
  }

  onReset(): void {
    this.form.reset();
    this.showFormState = false;
  }
}
