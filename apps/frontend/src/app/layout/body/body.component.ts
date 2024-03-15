import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'ha-body',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule, RouterModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  @Input() isIframe = true;

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth < 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }

    return styleClass;
  }
}
