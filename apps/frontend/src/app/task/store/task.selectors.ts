import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../../shared/IStore';
import { ITask } from '../utils/ITask';

export const selectTasks = (state: IAppState) => {
  console.log('Selector called');
  console.log(state.tasks);
  return state.tasks;
};

const getTasksState = createFeatureSelector<ITask[]>('tasks');

export const selectGetTasks = createSelector(getTasksState, (state) => {
  return state;
});

export const selectTaskById = (id: number) =>
  createSelector(selectTasks, (tasks) => tasks.find((task) => task.id === id));
