import {
  AfterViewInit, ChangeDetectorRef, Component, computed, effect, forwardRef, inject, Injector, input, OnDestroy, OnInit, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule, ValidationErrors
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { FormFieldInputConfig, FormFieldInputOptions } from './form-field-input.model';

@Component({
  selector: 'app-form-field-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  template: `
    <mat-form-field class="w-full" [appearance]="fullConfig().appearance">
      <mat-label *ngIf="fullConfig().label">{{ fullConfig().label }}</mat-label>
      <span *ngIf="fullConfig().prefix" matTextPrefix>{{ fullConfig().prefix }}&nbsp;</span>

      <input
        matInput
        [formControl]="internalControl"
        (blur)="handleBlur()"
        [required]="required()"
      >

      <span *ngIf="fullConfig().suffix" matTextSuffix>{{ fullConfig().suffix }}</span>
      <mat-icon *ngIf="fullConfig().icon" matSuffix>{{ fullConfig().icon }}</mat-icon>
      <mat-hint *ngIf="fullConfig().hint">{{ fullConfig().hint }}</mat-hint>

      <mat-error *ngIf="parentControlState().invalid && (parentControlState().touched || parentControlState().dirty)">
        {{ getErrorMessage(parentControlState().errorKeys[0], parentControlState().errors) }}
      </mat-error>
    </mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldInputComponent),
      multi: true
    }
  ]
})
export class FormFieldInputComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  config = input<FormFieldInputOptions>({});
  fullConfig = computed<FormFieldInputConfig>(() => ({
    appearance: 'fill',
    type: 'text',
    label: '',
    placeholder: '',
    hint: '',
    icon: '',
    prefix: '',
    suffix: '',
    ariaLabel: '',
    errorMessages: {},
    ...this.config()
  }));

  parentControl = signal<NgControl | null>(null);
  parentControlState = signal({
    invalid: false,
    touched: false,
    dirty: false,
    errors: null as ValidationErrors | null,
    errorKeys: [] as string[]
  });
  required = signal(false);

  internalControl = new FormControl('');
  private destroyed$ = new Subject<void>();
  private readonly injector: Injector = inject(Injector);
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  private defaultErrorMessages: Record<string, string> = {
    required: 'Este campo es requerido.',
    email: 'Por favor ingrese un email válido.',
    pattern: 'El formato no es válido.'
  };

  constructor() {
    effect(() => {
      const parent = this.parentControl();
      if (parent?.control) {
        const parentErrors = parent.errors;
        if (JSON.stringify(this.internalControl.errors) !== JSON.stringify(parentErrors)) {
          this.internalControl.setErrors(parentErrors ?? null);
        }
      }
    });
  }

  ngOnInit() {
    this.internalControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => {
        this.onChange(value);
      });
  }

  ngAfterViewInit() {
    const parent = this.injector.get(NgControl, null);
    this.parentControl.set(parent);

    if (parent?.control) {
      const parentValidator = parent.control.validator;
      if (parentValidator) {
        this.required.set(!!parentValidator(new FormControl(''))?.['required']);
      }

      parent.control.statusChanges
        .pipe(startWith(parent.control.status), takeUntil(this.destroyed$))
        .subscribe(() => {
          const errors = parent.errors;
          this.parentControlState.set({
            invalid: parent.invalid ?? false,
            touched: parent.touched ?? false,
            dirty: parent.dirty ?? false,
            errors: errors,
            errorKeys: errors ? Object.keys(errors) : []
          });
        });
    }
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getErrorMessage(errorKey: string, errors: ValidationErrors | null): string {
    if (!errors || !errorKey) return '';
    const customMessages = this.fullConfig().errorMessages || {};
    return customMessages[errorKey] || this.defaultErrorMessages[errorKey] || 'Error';
  }

  handleBlur(): void { this.onTouched(); }
  writeValue(value: any): void { this.internalControl.setValue(value, { emitEvent: false }); }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { isDisabled ? this.internalControl.disable() : this.internalControl.enable(); }
}
