import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './components/models';

const TASKS_URL: string = "http://localhost:8080/api/tasks"

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  onTaskId = new Subject<string>

  // response > {'message': 'successfully saved', 'ObjId': '641f24ffabeddb74ebcee91f'}
  postTask(taskData: Task[]): Observable<any> {
    return this.http.post(TASKS_URL, taskData)
      .pipe()
  }
}
