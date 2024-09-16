import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../store/auth/auth.actions'; // Adjust path if needed

@Component({
  selector: 'app-tm-core-app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tm-core-app-layout.component.html',
  styleUrl: './tm-core-app-layout.component.css',
})
export class TmCoreAppLayoutComponent {
  constructor(private router: Router, private store: Store) {}

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
