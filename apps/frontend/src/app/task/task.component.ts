import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../shared/IStore';
import {
  updateTaskAction,
  deleteTaskAction,
  addTaskAction,
} from './store/task.actions';
import { ITask } from './utils/ITask';
import { selectGetTasks } from './store/task.selectors';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [CommonModule, ButtonModule],
  standalone: true,
})
export class TaskComponent {
  tasks: ITask[] = [];

  constructor(private store: Store<IAppState>) {
    console.log('Constructor called');
    this.store.select(selectGetTasks).subscribe((tasks) => {
      console.log(tasks);
      this.tasks = [...tasks];
      console.log('After assigning tasks');
      console.log(this.tasks);
    });
  }

  addNewTask() {
    console.log('addNewTask');
    console.log(this.tasks.length);

    // gets highest id from tasks array
    const maxId = this.tasks.reduce((max, task) => Math.max(max, task.id), 0);

    const newTask: ITask = {
      id: maxId + 1,
      title: 'New Task',
      description: 'This is a new task.',
    };
    console.log('newTask:', newTask);
    this.store.dispatch(addTaskAction({ task: newTask }));
  }

  updateTask(task: ITask) {
    const updatedTask: ITask = {
      ...task,
      title: 'Updated Task',
      description: 'This task has been updated.',
    };
    this.store.dispatch(updateTaskAction({ task: updatedTask }));
  }

  deleteTask(id: number) {
    this.store.dispatch(deleteTaskAction({ id }));
  }
}
