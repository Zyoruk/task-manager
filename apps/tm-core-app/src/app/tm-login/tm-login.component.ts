import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmAuthService, Credentials } from '../services/tm-auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Store } from '@ngrx/store';
import {
  TmButtonComponent,
  TmIconButtonTextComponent,
  TmInputComponent,
} from '@task-manager/tm-ui';
import { AuthFacade } from '@task-manager/shared/tm-store';

@Component({
  selector: 'app-tm-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TmButtonComponent,
    TmInputComponent,
    TmIconButtonTextComponent,
  ], // Add FormsModule to imports
  providers: [TmAuthService, AuthFacade],
  templateUrl: './tm-login.component.html',
  styleUrl: './tm-login.component.css',
})
export class TmLoginComponent {
  credentials = signal<Credentials>({
    email: '',
    password: '',
  });
  errorMessage = '';

  constructor(
    private authService: TmAuthService,
    private authFacade: AuthFacade
  ) {}

  onInputChange(name: 'email' | 'password', value: string) {
    console.log(name, value);
    this.credentials.set({ ...this.credentials(), [name]: value });
  }

  login(): void {
    this.authService.login(this.credentials()).subscribe({
      next: (response) => {
        this.authFacade.loginSuccess({ accessToken: response.access_token });
        console.log('Login successful:', response);
      },
      error: (error) => {
        // Handle login error (e.g., display error message)
        this.errorMessage = 'Invalid email or password';
        console.error('Login failed:', error);
        this.authFacade.loginError();
      },
    });
  }

  onSignUpClick($event: Event): void {
    $event.stopPropagation();
    console.log('Sign up clicked');
  }
}
