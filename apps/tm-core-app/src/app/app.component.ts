import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TmLoginComponent } from './tm-login/tm-login.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, TmLoginComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tm-core-app';
}
