import { Component, Input, Output } from '@angular/core';
import { Task } from './models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  @Input()
  taskList!: Task[]

  @Output()
  onDelete = new Subject<number>

  @Output()
  onSelect = new Subject<number>

  deleteTask(index: number) {
    // this.taskList.splice(index, 1)
    this.onDelete.next(index)
  }

  selectTask(index: number) {
    this.onSelect.next(index)
  }
}
