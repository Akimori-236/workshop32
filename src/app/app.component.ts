import { Component, Input } from '@angular/core';
import { Task } from './components/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workshop32';

  taskList: Task[] = []

  saveTask(newTask: Task) {
    this.taskList.push(newTask)
    console.debug("Task Saved>>>", newTask)
  }

  deleteTask(index: number) {
    this.taskList.splice(index, 1)
  }
}
