import { Route } from '@angular/router';
import { TmLoginComponent } from './tm-login/tm-login.component'; // Import the component
import { AuthGuard } from './guards/auth.guard';
import { TmCoreAppLayoutComponent } from './tm-core-app-layout/tm-core-app-layout.component';
import { TmTasksAppComponent } from './tm-tasks-app/tm-tasks-app.component';
import { TmMetricsAppComponent } from './tm-metrics-app/tm-metrics-app.component';
import { TmSettingsAppComponent } from './tm-settings-app/tm-settings-app.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: TmCoreAppLayoutComponent,
    canActivate: [AuthGuard], // Use the layout component here
    children: [
      // Define child routes within the layout
      { path: 'tasks', component: TmTasksAppComponent },
      { path: 'dashboard', component: TmMetricsAppComponent },
      { path: 'settings', component: TmSettingsAppComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default route
      { path: '**', redirectTo: 'dashboard' }
      // ... other protected routes
    ],
  },
  {
    path: 'login', // The path in the URL (e.g., /login)
    component: TmLoginComponent,
  },
  // ... other routes
];
