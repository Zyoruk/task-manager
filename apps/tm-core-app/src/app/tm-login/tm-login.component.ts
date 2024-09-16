import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmLoginService } from '../services/tm-login.service';

@Component({
  selector: 'app-tm-login',
  standalone: true,
  imports: [CommonModule],
  providers: [TmLoginService],
  templateUrl: './tm-login.component.html',
  styleUrl: './tm-login.component.css',
})
export class TmLoginComponent {}
