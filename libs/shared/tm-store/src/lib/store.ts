import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { AuthEffects } from './auth/auth.effects';
import { authReducer } from './auth/auth.reducer';

const reducers: ActionReducerMap<any> = { auth: authReducer };

function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const getStore = ({ environment }: { environment: { production: boolean } }) =>
  importProvidersFrom(
    StoreModule.forRoot(reducers, { metaReducers }), // Register the auth reducer
    EffectsModule.forRoot([AuthEffects]), // Register the effects
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 })
  );
