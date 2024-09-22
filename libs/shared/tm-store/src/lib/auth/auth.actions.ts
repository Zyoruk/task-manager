import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ accessToken: string }>()
);

export const logout = createAction('[Auth] Logout');

export const signupSuccess = createAction('[Auth] Signup');

export const signupError = createAction('[Auth] Signup Error');

export const loginError = createAction('[Auth] Login Error');
