import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import * as AuthActions from './auth.actions';
import { selectAccessToken } from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(private store: Store<{ auth: AuthState }>) {}

  get isLoggedIn$() {
    return !!this.accessToken$;
  }

  get accessToken$() {
    return selectAccessToken(this.store);
  }

  loginSuccess({ accessToken }: { accessToken: string }) {
    this.store.dispatch(AuthActions.loginSuccess({ accessToken }));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
