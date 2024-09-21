import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tm-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule ,MatIconModule],
  templateUrl: './tm-button.component.html',
  styleUrl: './tm-button.component.css',
})
export class TmButtonComponent extends MatButton {
  @Input() text = 'Click me!'; // Default button text
  @Input() variant: 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab' = 'raised';
  @Output() buttonClick = new EventEmitter<any>(); // Event emitter

  onClick() {
    this.buttonClick.emit(); // Emit the event
  }
}
