import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
export class TmCoreAppLayoutComponent implements OnInit {
  @ViewChild('toastContainer', { read: ViewContainerRef, static: true })
  toastContainer!: ViewContainerRef;
  title = 'tm-core-app';

  constructor(private router: Router, private store: Store) {}

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  async ngOnInit() {
    const tmToastMessageComponent = await import(
      '@tm-notifications-app/ToastMessage'
    );
    this.toastContainer.createComponent(
      tmToastMessageComponent.TmToastMessageComponent
    );
  }
}
