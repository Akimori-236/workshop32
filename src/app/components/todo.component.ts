import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Task } from './models';
import { Observable, Subject, map, startWith, tap } from 'rxjs';

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

  get isInvalid$(): Observable<boolean> {
    // stream that keeps checking after every change
    return this.todoForm.statusChanges.pipe(
      tap(v => {
        console.log("Form Status >>> ", v)
      }),
      startWith("INVALID"), // initial value to send
      map(v => "INVALID" == v) // keep checking
    )

  }
}
