import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tasks', component: TaskComponent },
  { path: '', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];
