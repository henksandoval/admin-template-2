import {
  Component,
  Input,
  forwardRef,
  OnInit,
  Injector,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormFieldDirective } from '@shared/atoms/form-field.directive';
import { TextInputDirective } from '@shared/atoms/text-input.directive';
import { Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-form-field-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormFieldDirective,
    TextInputDirective
  ],
  template: `
    <mat-form-field appFormField [appearance]="appearance">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <span *ngIf="prefix" matTextPrefix>{{ prefix }}&nbsp;</span>

      <input
        matInput
        appTextInput
        [formControl]="internalControl"
        [type]="type"
        [placeholder]="placeholder"
        (blur)="handleBlur()"
        [attr.aria-label]="ariaLabel || label"
        [required]="required"
      >

      <span *ngIf="suffix" matTextSuffix>{{ suffix }}</span>
      <mat-icon *ngIf="icon" matSuffix>{{ icon }}</mat-icon>
      <mat-hint *ngIf="hint">{{ hint }}</mat-hint>

      <mat-error *ngIf="parentControl?.errors && (parentControl?.touched || parentControl?.dirty)">
        {{ getErrorMessage(errorKeys[0], parentControl?.errors ?? null) }}
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
  @Input() label = '';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() icon = '';
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' = 'text';
  @Input() appearance: 'fill' | 'outline' = 'fill';
  @Input() ariaLabel = '';
  @Input() errorMessages: Record<string, string> = {};
  @Input() required = false;

  internalControl = new FormControl('');
  parentControl: NgControl | null = null;
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

  ngOnInit() {
    this.internalControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => {
        this.onChange(value);
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.parentControl = this.injector.get(NgControl, null);
      if (this.parentControl?.control) {
        const parentValidator = this.parentControl.control.validator;
        if (parentValidator) {
          const errors = parentValidator(new FormControl(''));
          if (errors && errors['required']) {
            this.required = true;
          }
        }

        this.parentControl.control.statusChanges
          .pipe(startWith(this.parentControl.control.status), takeUntil(this.destroyed$))
          .subscribe(() => {
            const parentErrors = this.parentControl?.errors;
            if (JSON.stringify(this.internalControl.errors) !== JSON.stringify(parentErrors)) {
              this.internalControl.setErrors(parentErrors ?? null);
            }
          });
      }

      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get errorKeys(): string[] {
    return this.parentControl?.errors ? Object.keys(this.parentControl.errors) : [];
  }

  getErrorMessage(errorKey: string, errors: ValidationErrors | null): string {
    if (!errors || !errorKey) return '';

    return this.errorMessages[errorKey] || this.defaultErrorMessages[errorKey] || 'Error';
  }

  handleBlur(): void { this.onTouched(); }

  writeValue(value: any): void {
    this.internalControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.internalControl.disable() : this.internalControl.enable();
  }
}
