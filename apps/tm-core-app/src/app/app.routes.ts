import { Route } from '@angular/router';
import { TmLoginComponent } from './tm-login/tm-login.component'; // Import the component

export const appRoutes: Route[] = [
  { 
    path: 'login', // The path in the URL (e.g., /login)
    component: TmLoginComponent 
  },
  // ... other routes
];
