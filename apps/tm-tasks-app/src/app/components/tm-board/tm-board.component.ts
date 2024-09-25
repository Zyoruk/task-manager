import { Param } from '@nestjs/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
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
import { CardComponent } from '@task-manager/tm-ui';

interface Column {
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-tm-board',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CardComponent,
  ],
  templateUrl: './tm-board.component.html',
  styleUrl: './tm-board.component.scss',
})
export class TmBoardComponent implements AfterViewInit {
  @Input() tasks: Task[] = [
    {
      taskId: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 1',
      reportedBy: 'User 1',
    },
    {
      taskId: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 2',
      reportedBy: 'User 2',
    },
    {
      taskId: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 3',
      reportedBy: 'User 3',
    },
    {
      taskId: '4',
      title: 'Task 4',
      description: 'Description 4',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 4',
      reportedBy: 'User 4',
    },
    {
      taskId: '5',
      title: 'Task 5',
      description: 'Description 5',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 5',
      reportedBy: 'User 5',
    },
    {
      taskId: '6',
      title: 'Task 6',
      description: 'Description 6',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 6',
      reportedBy: 'User 6',
    },
    {
      taskId: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 1',
      reportedBy: 'User 1',
    },
    {
      taskId: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 2',
      reportedBy: 'User 2',
    },
    {
      taskId: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 3',
      reportedBy: 'User 3',
    },
    {
      taskId: '4',
      title: 'Task 4',
      description: 'Description 4',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 4',
      reportedBy: 'User 4',
    },
    {
      taskId: '5',
      title: 'Task 5',
      description: 'Description 5',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 5',
      reportedBy: 'User 5',
    },
    {
      taskId: '6',
      title: 'Task 6',
      description: 'Description 6',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 6',
      reportedBy: 'User 6',
    },
    {
      taskId: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 1',
      reportedBy: 'User 1',
    },
    {
      taskId: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 2',
      reportedBy: 'User 2',
    },
    {
      taskId: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 3',
      reportedBy: 'User 3',
    },
    {
      taskId: '4',
      title: 'Task 4',
      description: 'Description 4',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 4',
      reportedBy: 'User 4',
    },
    {
      taskId: '5',
      title: 'Task 5',
      description: 'Description 5',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 5',
      reportedBy: 'User 5',
    },
    {
      taskId: '6',
      title: 'Task 6',
      description: 'Description 6',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 6',
      reportedBy: 'User 6',
    },
    {
      taskId: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 1',
      reportedBy: 'User 1',
    },
    {
      taskId: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 2',
      reportedBy: 'User 2',
    },
    {
      taskId: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 3',
      reportedBy: 'User 3',
    },
    {
      taskId: '4',
      title: 'Task 4',
      description: 'Description 4',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 4',
      reportedBy: 'User 4',
    },
    {
      taskId: '5',
      title: 'Task 5',
      description: 'Description 5',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 5',
      reportedBy: 'User 5',
    },
    {
      taskId: '6',
      title: 'Task 6',
      description: 'Description 6',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 6',
      reportedBy: 'User 6',
    },
    {
      taskId: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 1',
      reportedBy: 'User 1',
    },
    {
      taskId: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 2',
      reportedBy: 'User 2',
    },
    {
      taskId: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 3',
      reportedBy: 'User 3',
    },
    {
      taskId: '4',
      title: 'Task 4',
      description: 'Description 4',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 4',
      reportedBy: 'User 4',
    },
    {
      taskId: '5',
      title: 'Task 5',
      description: 'Description 5',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 5',
      reportedBy: 'User 5',
    },
    {
      taskId: '6',
      title: 'Task 6',
      description: 'Description 6',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 6',
      reportedBy: 'User 6',
    },
    {
      taskId: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 1',
      reportedBy: 'User 1',
    },
    {
      taskId: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 2',
      reportedBy: 'User 2',
    },
    {
      taskId: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 3',
      reportedBy: 'User 3',
    },
    {
      taskId: '4',
      title: 'Task 4',
      description: 'Description 4',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 4',
      reportedBy: 'User 4',
    },
    {
      taskId: '5',
      title: 'Task 5',
      description: 'Description 5',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 5',
      reportedBy: 'User 5',
    },
    {
      taskId: '6',
      title: 'Task 6',
      description: 'Description 6',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 6',
      reportedBy: 'User 6',
    },
    {
      taskId: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 1',
      reportedBy: 'User 1',
    },
    {
      taskId: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 2',
      reportedBy: 'User 2',
    },
    {
      taskId: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 3',
      reportedBy: 'User 3',
    },
    {
      taskId: '4',
      title: 'Task 4',
      description: 'Description 4',
      status: 'pending',
      dueDate: '',
      assignedTo: 'User 4',
      reportedBy: 'User 4',
    },
    {
      taskId: '5',
      title: 'Task 5',
      description: 'Description 5',
      status: 'in-progress',
      dueDate: '',
      assignedTo: 'User 5',
      reportedBy: 'User 5',
    },
    {
      taskId: '6',
      title: 'Task 6',
      description: 'Description 6',
      status: 'completed',
      dueDate: '',
      assignedTo: 'User 6',
      reportedBy: 'User 6',
    },
  ];
  @Input() isLoading = false;
  @Output() taskDelete = new EventEmitter<Task>();
  @Output() taskEdit = new EventEmitter<Task>();
  @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;

  columns = [
    { title: 'Pending', status: 'pending' },
    { title: 'In Progress', status: 'in-progress' },
    { title: 'Completed', status: 'completed' },
  ];
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

  trackByTaskId(index: number, task: Task): string {
    return task.taskId;
  }

  getColumnTasks(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  getConnectedLists(): CdkDropList[] {
    // Logic to determine connected lists based on your requirements
    return this.dropLists?.toArray();
  }

  ngAfterViewInit() {
    // Now you can safely access and connect the drop lists
    this.dropLists.forEach(list => {
      // Assuming you want all lists connected to each other:
      list.connectedTo = this.dropLists.toArray();
    });
  }
}
