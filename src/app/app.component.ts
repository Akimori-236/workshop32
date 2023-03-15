import { Component, Input, Output } from '@angular/core';
import { Task } from './components/models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workshop32';

  taskList: Task[] = []

  selectedTask!: Task

  saveTask(newTask: Task) {
    this.taskList.push(newTask)
    console.debug("Task Saved>>>", newTask)
  }

  deleteTask(index: number) {
    this.taskList.splice(index, 1)
  }

  selectTask(index: number) {
    const t = this.taskList.at(index)
    if (!!t) {
      this.selectedTask = {
        index: index,
        desc: t.desc,
        priority: t.priority,
        due: t.due
      }
    }
  }
}
