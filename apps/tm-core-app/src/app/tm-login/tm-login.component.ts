import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmLoginService, Credentials } from '../services/tm-login.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { loginSuccess } from '../store/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tm-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  providers: [TmLoginService],
  templateUrl: './tm-login.component.html',
  styleUrl: './tm-login.component.css',
})
export class TmLoginComponent {
  credentials: Credentials = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private loginService: TmLoginService, private store: Store) {}

  login(): void {
    this.loginService.login(this.credentials).subscribe({
      next: (response) => {
        // Handle successful login (e.g., store token, redirect)
        this.store.dispatch(
          loginSuccess({ accessToken: response.access_token })
        );
        console.log('Login successful:', response);
      },
      error: (error) => {
        // Handle login error (e.g., display error message)
        this.errorMessage = 'Invalid email or password';
        console.error('Login failed:', error);
      },
    });
  }
}
