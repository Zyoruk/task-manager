import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'tm-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './tm-input.component.html',
  styleUrl: './tm-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TmInputComponent implements OnInit {
  @Input() label = '';
  @Input() disabled = false;
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() formControl = new FormControl();
  @Input() floatLabel = false;
  @Input() hint = '';
  @Input() errorMessage = '';
  @Input() icon = '';
  @Input() iconPosition: 'before' | 'after' = 'before';
  @Input() maxLength?: number = undefined;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInput = new EventEmitter<string>();
  hide = signal(false);
  inputValue = signal('');
  get inputType(): string {
    return this.type === 'password' ? (this.hide() ? 'password' : 'text') : this.type;
  }
  ngOnInit() {
    this.inputValue.set(this.value)
    this.hide.set(this.type === 'password')
  }

  onInputChange(value: Event) {
    this.inputValue.set((value.target as HTMLInputElement).value);
    this.onInput.emit((value.target as HTMLInputElement).value);
  }

  onHide(event: MouseEvent) {
    event.stopPropagation();

    console.log(this.hide())
    this.hide.set(!this.hide());
  }
}
