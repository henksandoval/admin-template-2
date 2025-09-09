import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldInputComponent } from '@shared/atoms/form-field-input/form-field-input.component';
import { FormFieldInputOptions } from '@shared/atoms/form-field-input/form-field-input.model';
import { ControlConnectorDirective } from '@shared/atoms/form-field-input/control-connector.directive';

@Component({
  selector: 'app-basic-forms',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FormFieldInputComponent,
    ControlConnectorDirective
  ],
  templateUrl: './basic-forms.component.html',
})
export class BasicFormsComponent implements OnInit {
  public form!: FormGroup;

  public basicFieldConfig: FormFieldInputOptions = {
    label: 'Campo Básico',
    placeholder: 'Introduce un valor cualquiera'
  };

  public fullFeatureConfig: FormFieldInputOptions = {
    appearance: 'outline',
    label: 'Campo con Extras',
    placeholder: 'Ej: texto',
    hint: 'Este campo muestra todas las características visuales.',
    icon: 'star',
    prefix: 'PRE-',
    suffix: '-SUF',
    ariaLabel: 'Campo de demostración con todas las características'
  };

  public emailConfig: FormFieldInputOptions = {
    type: 'email',
    label: 'Correo Electrónico',
    placeholder: 'tu@correo.com',
    icon: 'email',
    appearance: 'outline',
    errorMessages: {
      required: 'El correo electrónico es obligatorio.',
    }
  };

  public passwordConfig: FormFieldInputOptions = {
    type: 'password',
    label: 'Contraseña',
    placeholder: 'Mínimo 8 caracteres',
    icon: 'lock',
    errorMessages: {
      required: 'La contraseña no puede estar vacía.',
      minlength: 'La contraseña debe tener al menos 8 caracteres.'
    }
  };

  public ageConfig: FormFieldInputOptions = {
    type: 'number',
    label: 'Edad',
    placeholder: '18-99',
    hint: 'Debe ser mayor de 18 años.',
    errorMessages: {
      required: 'La edad es requerida.',
      min: 'Debes ser mayor de 18 años para registrarte.',
      max: 'La edad parece ser demasiado alta.'
    }
  };

  public disabledConfig: FormFieldInputOptions = {
    label: 'Campo Deshabilitado',
    hint: 'Este campo no se puede editar.'
  };

  private router = inject(Router);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      basicField: [''],
      fullFeatureField: ['Valor inicial'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      disabledField: [{ value: 'Valor predefinido', disabled: true }]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
      alert('Formulario válido y enviado. Revisa la consola.');
    } else {
      console.log('El formulario contiene errores.');
      alert('El formulario no es válido.');
      this.form.markAllAsTouched();
    }
  }

  goBack(): void {
    this.router.navigate(['/pds']);
  }
}
