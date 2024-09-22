import { inject } from '@angular/core';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { selectAccessToken } from '../store/auth/auth.selectors'; // Adjust the path
import { switchMap, take } from 'rxjs/operators';

const authWhitelist = ['/login', '/signup'];

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // Inject the current `AuthService` and use it to get an authentication token:
  return inject(Store).pipe(
    select(selectAccessToken),
    take(1), // Important: Take only one emission and unsubscribe
    switchMap((token) => {
      // 2. Check if the request is for the login endpoint
      if (authWhitelist.some((route) => req.url.includes(route)) || !token) {
        // If it's a login request or there's no token, don't modify
        return next(req);
      }

      // 3. Clone the request and add the Authorization header
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
        withCredentials: true,
      });

      // 4. Handle the modified request
      return next(authReq);
    })
  );
}
