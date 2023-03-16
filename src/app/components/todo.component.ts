import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Task } from './models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnChanges {

  @Output()
  onSetTask = new Subject<Task>()
  @Input()
  selectedTask!: Task

  todoForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      desc: this.fb.control<string>('', [Validators.required]),
      priority: this.fb.control<string>('', [Validators.required]),
      due: this.fb.control<string>('', [Validators.required]),
    })
  }
  // GETTER
  get value(): Task {
    return this.todoForm.value as Task
  }

  setTask() {
    const task = this.todoForm.value as Task
    console.debug("NEW TASK>>>", task)
    this.onSetTask.next(task)
    this.todoForm.reset()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.debug("Changes>>>", changes)
    const t: Task = changes['selectedTask'].currentValue
    // get FormControls
    const descControl = this.todoForm.get('desc') as FormControl
    const priorityControl = this.todoForm.get('priority') as FormControl
    const dueControl = this.todoForm.get('due') as FormControl
    // set Values
    descControl.setValue(t.desc)
    priorityControl.setValue(t.priority)
    dueControl.setValue(t.due)
  }
}
