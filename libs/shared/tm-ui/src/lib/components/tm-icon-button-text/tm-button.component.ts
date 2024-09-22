import { Router, RouterModule } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tm-icon-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './tm-button.component.html',
  styleUrl: './tm-button.component.css',
})
export class TmIconButtonTextComponent {
  constructor(private readonly router: Router) {}

  @Input({ required: true }) text = 'Click me!'; // Default button text
  @Input() variant: 'raised' | 'stroked' | 'flat' = 'raised';
  @Input() routerLink: string | any[] = ''; // Router link
  @Input({ required: true }) icon = '';
  @Output() buttonClick = new EventEmitter<Event>(); // Event emitter
  onClick($event: Event) {
    $event.stopPropagation();
    this.buttonClick.emit($event); // Emit the event
    console.log('router link', this.routerLink)
    if (this.routerLink) {
      if (typeof this.routerLink === 'string') {
        this.router.navigate([this.routerLink]); // Navigate to the link
      } else {
        this.router.navigate(this.routerLink); // Navigate to the link
      }
    }
  }
}
