import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { BodyComponent } from './layout/body/body.component';
import { ToastModule } from 'primeng/toast';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, SidenavComponent, BodyComponent, ToastModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'events';
  isIframe = false;
  loginDisplay = false;

  isSideNavCollapsed = false;
  screenWidth = 0;

  oToggleSideNav(data: SideNavToggle): void {
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
