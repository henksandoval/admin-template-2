import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'mat-icon[appFormIcon]',
  standalone: true,
  host: {
    '[class]': 'iconClass',
    '[attr.aria-hidden]': 'ariaHidden'
  }
})
export class FormIconDirective {
  @Input() iconClass = 'text-gray-500';
  @Input() ariaHidden = 'true';
}
