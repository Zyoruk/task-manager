import { MatMenuModule } from '@angular/material/menu';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { TmHeaderComponent } from '../header/header.component';
import { Subject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { TmIconButtonTextComponent } from '../tm-icon-button-text/tm-button.component';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tm-tm-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    TmHeaderComponent,
    MatIconModule,
    MatMenuModule,
    TmIconButtonTextComponent,
    MatDividerModule,
    RouterModule,
  ],
  templateUrl: './tm-sidenav.component.html',
  styleUrl: './tm-sidenav.component.css',
})
export class TmSidenavComponent implements OnInit {
  @ViewChild('drawer') drawerRef!: MatDrawer;
  @Input() toggleDrawerSubject = new Subject<boolean>();
  @Output() exitApp = new EventEmitter<void>();

  ngOnInit() {
    this.toggleDrawerSubject.subscribe(() => {
      (this.drawerRef as MatDrawer).toggle();
    });
  }
}
