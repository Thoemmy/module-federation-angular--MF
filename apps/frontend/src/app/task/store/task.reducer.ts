import {
  addTaskAction,
  deleteTaskAction,
  getTaskFailAction,
  getTaskSuccessAction,
  updateTaskAction,
} from './task.actions';
import { ITask } from '../utils/ITask';
import { ActionReducer, createReducer, on } from '@ngrx/store';

export const taskState: ITask[] = [];

// Old Version

// export function taskReducer(state = taskState, action: any): ITask[] {
//   switch (action.type) {
//     case addTask.type:
//       console.log('state', state);
//       return [...state, action.task];
//     //return { ...state, tasks: [...state.tasks, action.task] };

//     case updateTask.type:
//       console.log('state', state);
//       return state.map((t) => (t.id === action.task.id ? action.task : t));

//     case deleteTask.type:
//       return state.filter((t) => t.id !== action.id);

//     default:
//       return state;
//   }
// }

// New Version

export const taskReducers: ActionReducer<ITask[]> = createReducer(
  taskState,
  on(getTaskSuccessAction, (state, action) => {
    return { ...state, tasks: action.tasks };
  }),
  on(getTaskFailAction, (state, action) => {
    return { ...state, error: action.error };
  }),
  on(addTaskAction, (state, action) => [...state, action.task]),
  on(updateTaskAction, (state, action) =>
    state.map((t) => (t.id === action.task.id ? action.task : t))
  ),
  on(deleteTaskAction, (state, action) =>
    state.filter((t) => t.id !== action.id)
  )
);
