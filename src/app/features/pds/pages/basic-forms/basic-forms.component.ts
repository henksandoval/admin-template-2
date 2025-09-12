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
    label: $localize`:@@pds.forms.basicField.label:Basic Field`,
    placeholder: $localize`:@@pds.forms.basicField.placeholder:Enter any value`
  };

  public fullFeatureConfig: FormFieldInputOptions = {
    appearance: 'outline',
    label: $localize`:@@pds.forms.fullFeature.label:Field with Extras`,
    placeholder: $localize`:@@pds.forms.fullFeature.placeholder:E.g: text`,
    hint: $localize`:@@pds.forms.fullFeature.hint:This field shows all visual features`,
    icon: 'star',
    prefix: 'PRE-',
    suffix: '-SUF',
    ariaLabel: $localize`:@@pds.forms.fullFeature.ariaLabel:Demo field with all features`
  };

  public emailConfig: FormFieldInputOptions = {
    type: 'email',
    label: $localize`:@@common.form.email:Email`,
    placeholder: $localize`:@@pds.forms.email.placeholder:your@email.com`,
    icon: 'email',
    appearance: 'outline',
    errorMessages: {
      required: $localize`:@@pds.forms.email.required:Email address is required`,
    }
  };

  public passwordConfig: FormFieldInputOptions = {
    type: 'password',
    label: $localize`:@@common.form.password:Password`,
    placeholder: $localize`:@@pds.forms.password.placeholder:Minimum 8 characters`,
    icon: 'lock',
    errorMessages: {
      required: $localize`:@@pds.forms.password.required:Password cannot be empty`,
      minlength: $localize`:@@pds.forms.password.minlength:Password must be at least 8 characters long`
    }
  };

  public ageConfig: FormFieldInputOptions = {
    type: 'number',
    label: $localize`:@@common.form.age:Age`,
    placeholder: $localize`:@@pds.forms.age.placeholder:18-99`,
    hint: $localize`:@@pds.forms.age.hint:Must be over 18 years old`,
    errorMessages: {
      required: $localize`:@@pds.forms.age.required:Age is required`,
      min: $localize`:@@pds.forms.age.min:You must be over 18 years old to register`,
      max: $localize`:@@pds.forms.age.max:Age seems too high`
    }
  };

  public disabledConfig: FormFieldInputOptions = {
    label: $localize`:@@pds.forms.disabled.label:Disabled Field`,
    hint: $localize`:@@pds.forms.disabled.hint:This field cannot be edited`
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
