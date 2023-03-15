import { Component, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from './models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  @Output()
  onSetTask = new Subject<Task>()

  todoForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      desc: this.fb.control<string>('', [Validators.required]),
      priority: this.fb.control<string>('', [Validators.required]),
      due: this.fb.control<string>('', [Validators.required]),
    })
  }

  setTask() {
    const task = this.todoForm.value as Task
    console.debug("NEW TASK>>>", task)
    this.onSetTask.next(task)
    this.todoForm.reset
  }
}
