import { AfterContentInit, AfterViewInit, Component, ViewChild } from '@angular/core';
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

  get taskIndex() {
    if (this.selectedTask.index) {
      return this.selectedTask.index
    } else {
      return -1
    }
  }

  get isTaskListInvalid(): boolean {
    return this.taskList.length < 1
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
        description: t.description,
        priority: t.priority,
        dueDate: t.dueDate
      }
    }
  }

  @ViewChild(TodoComponent)
  todoComp!: TodoComponent
  isFormInvalid!: Observable<boolean>

  // getting NG0100 error with ngAfterViewInit
  ngAfterViewInit(): void {
    // get a stream of validity of child form
    // so that the update button get constantly updated if the form is valid
    this.isFormInvalid = this.todoComp.isFormInvalid$
  }
  updateTask() {
    // grab form values from child component
    let updated: Task = this.todoComp.todoForm.value as Task
    // which task to update?
    updated.index = this.selectedTask.index
    console.debug("Updated >>> ", updated) // sanity check
    // send to task list
    if (updated.index != undefined) {
      this.taskList.splice(updated.index, 1, updated)
      this.todoComp.todoForm.reset()
    }
  }

  saveList() {
    
  }
}
