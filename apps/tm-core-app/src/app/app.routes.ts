import { Route } from '@angular/router';
import { TmLoginComponent } from './tm-login/tm-login.component'; // Import the component
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  { 
    path: 'login', // The path in the URL (e.g., /login)
    component: TmLoginComponent 
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard], // Apply the guard here
  },
  // ... other routes
];
