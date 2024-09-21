import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface LoginResponse {
  // Define the structure of your login response (e.g., access_token)
  access_token: string;
}

interface SignupResponse {
  // Define the structure of your signup response
  message: string;
}

interface ValidateTokenResponse {
  // Define the structure of your token validation response
  valid: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' }) // Make the service available globally
export class TmAuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}); // Adjust if needed
  }

  signup(userData: UserData): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/signup`, userData);
  }

  validateToken(): Observable<ValidateTokenResponse> {
    return this.http.get<ValidateTokenResponse>(`${this.apiUrl}/validate_token`);
  }
}
