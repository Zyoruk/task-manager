import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('toastContainer', { read: ViewContainerRef, static: true })
  toastContainer!: ViewContainerRef;
  title = 'tm-core-app';

  async ngOnInit() {
    const tmToastMessageComponent = await import ('tm-notifications-app/ToastMessage');
    this.toastContainer.createComponent(tmToastMessageComponent.TmToastMessageComponent);
  }
}
