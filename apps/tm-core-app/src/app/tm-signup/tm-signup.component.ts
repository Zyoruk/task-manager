import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmAuthService, UserData } from '../services/tm-auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { signupError, signupSuccess } from '../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  TmButtonComponent,
  TmInputComponent,
  TmIconButtonTextComponent,
} from '@task-manager/tm-ui';

@Component({
  selector: 'app-tm-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TmButtonComponent,
    TmInputComponent,
    TmIconButtonTextComponent,
  ], // Add FormsModule to imports
  providers: [TmAuthService],
  templateUrl: './tm-signup.component.html',
  styleUrl: './tm-signup.component.css',
})
export class TmSignUpComponent {
  credentials = signal<UserData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  errorMessage = '';

  constructor(
    private authService: TmAuthService,
    private store: Store,
    private router: Router
  ) {}

  onInputChange(
    name: 'email' | 'password' | 'firstName' | 'lastName',
    value: string
  ) {
    console.log(name, value);
    this.credentials.set({ ...this.credentials(), [name]: value });
  }

  signup(): void {
    this.authService.signup(this.credentials()).subscribe({
      next: (response) => {
        this.store.dispatch(signupSuccess());
        console.log('Login successful:', response);
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';
        console.error('Login failed:', error);
        this.store.dispatch(signupError());
      },
    });
  }

  backToLogin($event: Event) {
    $event.stopPropagation();
    console.log('Back to login clicked');
  }
}
