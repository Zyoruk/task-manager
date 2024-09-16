import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  loginSuccess$;
  logout$;

  constructor(private actions$: Actions) {
    this.loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ accessToken }) => {
          localStorage.setItem('access_token', accessToken);
          // You might want to redirect to a protected page here
        }),
        map(() => ({ type: '[Auth] Login Success Effect' })) // Optional: Dispatch a success effect action
      )
    );

    this.logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('access_token');
          // You might want to redirect to the login page here
        }),
        map(() => ({ type: '[Auth] Logout Effect' })) // Optional: Dispatch a logout effect action
      )
    );
  }
}
