// shared/atoms/form-field.directive.ts
import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'mat-form-field[appFormField]',
  standalone: true,
  host: {
    '[appearance]': 'appearance',
    'class': 'w-full mb-4'
  }
})
export class FormFieldDirective {
  @Input() appearance: 'fill' | 'outline' = 'fill';
}
