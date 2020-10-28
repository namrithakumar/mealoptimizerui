import { Directive, HostBinding, Optional, Input } from '@angular/core';
import { ControlContainer} from '@angular/forms';

@Directive({
  selector: 'label[formControlName]',
})
export class LabelControl {
  @Input() formControlName: string;

  constructor(@Optional() private parent: ControlContainer) {}

  @HostBinding('textContent')
  get formControlValue() {
    return this.parent ? this.parent.control.get(this.formControlName).value : '';
  }
}