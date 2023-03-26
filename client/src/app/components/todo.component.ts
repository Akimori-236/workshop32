import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Task } from './models';
import { Observable, Subject, map, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnChanges {

  @Output()
  onSetTask = new Subject<Task>
  @Input()
  selectedTask!: Task

  todoForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      description: this.fb.control<string>('', [Validators.required]),
      priority: this.fb.control<string>('', [Validators.required]),
      dueDate: this.fb.control<Date>(new Date(), [Validators.required, this.futureDateValidator()]),
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
    descControl.setValue(t.description)
    priorityControl.setValue(t.priority)
    dueControl.setValue(t.dueDate)
  }

  // constant update if the form is valid or not
  get isFormInvalid$(): Observable<boolean> {
    // stream that keeps checking after every change
    return this.todoForm.statusChanges.pipe(
      tap(v => {
        console.log("Form Status >>> ", v)
      }),
      startWith("INVALID"), // initial value to send
      map(v => "INVALID" == v) // keep checking
    )
  }

  // Custom Validator creation for date checking
  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value)
      const currentDate = new Date()
      return selectedDate >= currentDate ? null : { 'invalidDate': true }
    }
  }
}
