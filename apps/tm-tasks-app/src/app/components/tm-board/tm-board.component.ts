import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

interface Column {
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-tm-board',
  standalone: true,
  imports: [CommonModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './tm-board.component.html',
  styleUrl: './tm-board.component.scss',
})
export class TmBoardComponent {
  @Input() tasks: Task[] = [];
  @Input() isLoading: boolean = false;
  @Output() onTaskDelete = new EventEmitter<Task>();
  @Output() onTaskEdit = new EventEmitter<Task>();

  public get columns(): Column[] {
    return [
      {
        title: 'Pending',
        tasks: this.tasks.filter(
          (task) => task.status.toLocaleLowerCase() === 'pending'
        ),
      },
      {
        title: 'In Progress',
        tasks: this.tasks.filter(
          (task) => task.status.toLocaleLowerCase() === 'pending'
        ),
      },
      {
        title: 'Completed',
        tasks: this.tasks.filter(
          (task) => task.status.toLocaleLowerCase() === 'pending'
        ),
      },
    ];
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
