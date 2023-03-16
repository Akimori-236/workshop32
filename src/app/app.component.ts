import { AfterViewInit, Component, Input, Output, ViewChild } from '@angular/core';
import { Task } from './components/models';
import { Observable, Subject } from 'rxjs';
import { TodoComponent } from './components/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
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

  @ViewChild(TodoComponent)
  todoComp!: TodoComponent
  isUpdateInvalid!: Observable<boolean>

  ngAfterViewInit(): void {
    // update validity of child form
    this.isUpdateInvalid = this.todoComp.isInvalid$
  }
  updateTask() {
    let updated: Task = this.todoComp.todoForm.value as Task
    updated.index = this.selectedTask.index
    console.debug("Updated >>> ", updated) // sanity check
    // send to task list
    if (!!updated.index) {
      this.taskList.splice(updated.index,1,updated)
      this.todoComp.todoForm.reset()
    }
  }
}
