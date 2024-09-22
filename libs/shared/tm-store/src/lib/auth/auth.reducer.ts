import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  accessToken: string | null;
}

export const initialState: AuthState = {
  accessToken: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { accessToken }) => ({ ...state, accessToken })),
  on(AuthActions.logout, (state) => ({ ...state, accessToken: null })),
  on(AuthActions.loginError, (state) => ({ ...state, accessToken: null })),
  on(AuthActions.signupSuccess, (state) => ({ ...state, accessToken: null })),
  on(AuthActions.signupError, (state) => ({ ...state, accessToken: null }))
);
