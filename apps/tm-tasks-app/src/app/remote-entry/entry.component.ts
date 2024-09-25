import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmBoardComponent } from "../components/tm-board/tm-board.component";

@Component({
  standalone: true,
  imports: [CommonModule, TmBoardComponent],
  selector: 'app-tm-tasks-app-entry',
  template: `<app-tm-board />`,
})
export class RemoteEntryComponent {}
