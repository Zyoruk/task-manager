import { Router, RouterModule } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tm-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './tm-button.component.html',
  styleUrl: './tm-button.component.css',
})
export class TmButtonComponent {
  constructor(private readonly router: Router) {}

  @Input() text = 'Click me!'; // Default button text
  @Input() variant:
    | 'raised'
    | 'stroked'
    | 'flat'
    | 'icon'
    | 'fab'
    | 'mini-fab' = 'raised';
  @Input() routerLink: string | any[] = ''; // Router link
  @Input() icon = '';
  @Output() buttonClick = new EventEmitter<Event>(); // Event emitter
  onClick($event: Event) {
    this.buttonClick.emit($event); // Emit the event
    if (this.routerLink) {
      if (typeof this.routerLink === 'string') {
        this.router.navigate([this.routerLink]); // Navigate to the link
      } else {
        this.router.navigate(this.routerLink); // Navigate to the link
      }
    }
  }
}
