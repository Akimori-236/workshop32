import { Component, Input } from '@angular/core';
import { Task } from './models';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  @Input()
  taskList!: Task[]

  deleteTask(index: number) {
    this.taskList.splice(index, 1)
  }
}
