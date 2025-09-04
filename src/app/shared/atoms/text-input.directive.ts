import { Directive, Input, HostBinding } from '@angular/core';
import { TextInputConfig } from '@shared/atoms/models/text-input-config.model';

@Directive({
  selector: 'input[appTextInput], textarea[appTextInput]',
  standalone: true
})
export class TextInputDirective {
  @Input() config: TextInputConfig = {};

  @HostBinding('type')
  get type(): string {
    return this.config.type || 'text';
  }

  @HostBinding('placeholder')
  get placeholder(): string {
    return this.config.placeholder || '';
  }

  @HostBinding('attr.aria-label')
  get ariaLabel(): string {
    return this.config.ariaLabel || '';
  }

  @HostBinding('class.border-red-500')
  get hasErrorClass(): boolean {
    return this.config.hasError || false;
  }

  @HostBinding('class.w-full')
  get isFullWidth(): boolean {
    return true;
  }
}
