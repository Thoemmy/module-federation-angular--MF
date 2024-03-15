import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../utils/ITask';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'single-task',
  standalone: true,
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css'],
  imports: [CommonModule, ButtonModule],
})
export class SingleTaskComponent {
  @Input() data!: ITask;
  @Output() public update = new EventEmitter<MouseEvent>();
  @Output() public delete = new EventEmitter<MouseEvent>();

  updateTask(event: MouseEvent) {
    this.update.emit(event);
  }

  deleteTask(event: MouseEvent) {
    this.delete.emit(event);
  }
}
