import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthFacade } from '@task-manager/shared/tm-store';
import { TmHeaderComponent, TmSidenavComponent } from '@task-manager/tm-ui';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-tm-core-app-layout',
  standalone: true,
  imports: [RouterModule, TmHeaderComponent, TmSidenavComponent],
  providers: [AuthFacade],
  templateUrl: './tm-core-app-layout.component.html',
  styleUrl: './tm-core-app-layout.component.css',
})
export class TmCoreAppLayoutComponent implements OnInit {
  @ViewChild('toastContainer', { read: ViewContainerRef, static: true })
  toastContainer!: ViewContainerRef;
  title = 'tm-core-app';
  toggleDrawerSubject = new Subject<boolean>();
  constructor(private router: Router, private authFacade: AuthFacade) {}

  handleMenuClick() {
    console.log('handleMenuClick');
    this.toggleDrawerSubject.next(true);
  }
  logout() {
    this.router.navigate(['/login']); // Redirect to login after logout
    this.authFacade.logout();
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
