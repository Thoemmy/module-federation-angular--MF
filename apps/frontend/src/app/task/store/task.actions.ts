import { createAction, props } from '@ngrx/store';
import { ITask } from '../utils/ITask';

// GET TASKS ########################
export const GET_TASKS = '[Task] Get Task';
export const GET_TASKS_SUCCESS = '[Task] Get Task success';
export const GET_TASKS_FAIL = '[Task] Get Task fail';

export const getTaskAction = createAction(GET_TASKS);
export const getTaskSuccessAction = createAction(
  GET_TASKS_SUCCESS,
  props<{ tasks: ITask[] }>()
);
export const getTaskFailAction = createAction(
  GET_TASKS_FAIL,
  props<{ error: any }>()
);
// #################################

export const addTaskAction = createAction(
  '[Task] Add Task',
  props<{ task: ITask }>()
);

export const updateTaskAction = createAction(
  '[Task] Update Task',
  props<{ task: ITask }>()
);

export const deleteTaskAction = createAction(
  '[Task] Delete Task',
  props<{ id: number }>()
);
