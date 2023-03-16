import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { Task } from './components/models';
import { Subject } from 'rxjs';
import { TodoComponent } from './components/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workshop32';

  taskList: Task[] = []

  selectedTask!: Task
  get taskIndex() {
    if (this.selectedTask.index) {
      return this.selectedTask.index
    } else {
      return -1
    }
  }

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

  @ViewChild(TodoComponent)
  toDoComp!: TodoComponent
  // @ViewChild('modifyButton')
  // modifyBtnRef!: ElementRef

  modifyTask() {
    let t: Task = this.toDoComp.value
    t.index = this.taskIndex
  }
}
