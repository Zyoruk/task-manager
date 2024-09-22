import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TmButtonComponent } from '../tm-button/tm-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'tm-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    TmButtonComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class TmHeaderComponent {
  @Output() exitApp = new EventEmitter<void>();
  @Output() menuClick = new EventEmitter<void>();
}
