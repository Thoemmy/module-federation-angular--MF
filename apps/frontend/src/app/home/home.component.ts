import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tasks',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class HomeComponent {}
