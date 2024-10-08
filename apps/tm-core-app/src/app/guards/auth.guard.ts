import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TmAuthService } from '../services/tm-auth.service';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { selectAccessToken } from '@task-manager/shared/tm-store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private loginService: TmAuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select(selectAccessToken),
      take(1), // Take only one emission from the store
      switchMap((accessToken) => {
        if (!accessToken) {
          // No token, redirect to login
          return of(this.router.parseUrl('/login'));
        }

        // Validate the token
        return this.loginService.validateToken().pipe(
          map((response) => {
            if (response) {
              // Token is valid, allow access
              return true;
            } else {
              // Token is invalid, redirect to login
              return this.router.parseUrl('/login');
            }
          }),
          catchError(() => {
            // Error during validation, redirect to login
            return of(this.router.parseUrl('/login'));
          })
        );
      })
    );
  }
}
