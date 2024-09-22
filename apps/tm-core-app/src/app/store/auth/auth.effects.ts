import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  loginSuccess$;
  logout$;
  signupSuccess$;

  constructor(private actions$: Actions, private readonly router: Router) {
    this.loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ accessToken }) => {
          localStorage.setItem('access_token', accessToken);
          this.router.navigate(['/dashboard']);
        }),
        map(() => ({ type: '[Auth] Login Success Effect' })) // Optional: Dispatch a success effect action
      )
    );

    this.logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('access_token');
          this.router.navigate(['/login']);
        }),
        map(() => ({ type: '[Auth] Logout Effect' })) // Optional: Dispatch a logout effect action
      )
    );

    this.signupSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        }),
        map(() => ({ type: '[Auth] Signup Success Effect' })) // Optional: Dispatch a success effect action
      )
    );
  }
}
