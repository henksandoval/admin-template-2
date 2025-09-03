// shared/atoms/text-input.directive.ts
import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'input[appTextInput], textarea[appTextInput]',
  standalone: true,
  host: {
    '[type]': 'type',
    '[placeholder]': 'placeholder',
    '[attr.aria-label]': 'ariaLabel',
    '[class.border-red-500]': 'hasError',
    'class': 'w-full'
  }
})
export class TextInputDirective {
  @Input() type: 'text' | 'password' | 'email' | 'number' | 'tel' = 'text';
  @Input() placeholder = '';
  @Input() ariaLabel = '';
  @Input() hasError = false;
}
