import { AuthGuard } from './guards/auth.guard';
import { Route } from '@angular/router';
import { TmCoreAppLayoutComponent } from './tm-core-app-layout/tm-core-app-layout.component';
import { TmLoginComponent } from './tm-login/tm-login.component';
import { TmSignUpComponent } from './tm-signup/tm-signup.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    pathMatch: 'full',
    component: TmLoginComponent,
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: TmSignUpComponent,
  },
  {
    path: '',
    component: TmCoreAppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tasks',
        loadChildren: () =>
          import('@tm-tasks-app/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@tm-dashboard-app/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('@tm-notifications-app/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('@tm-settings-app/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ],
  },
];
