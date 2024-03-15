import { fadeInOut } from '../sidenav.animations';
import { INavbarData } from '../sidenav.interface';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'ha-sublevel-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule],
  template: `
    <ul
      *ngIf="collapsed && data.items && data.items.length > 0"
      [@submenu]="
        expanded
          ? {
              value: 'visible',
              params: {
                transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)',
                height: '*'
              }
            }
          : {
              value: 'hidden',
              params: {
                transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)',
                height: '0'
              }
            }
      "
      class="sublevel-nav"
    >
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
        <a
          class="sublevel-nav-link"
          (click)="handleClick(item)"
          *ngIf="item.items && item.items.length > 0"
        >
          <i
            class="sublevel-link-icon"
            [ngClass]="!item.icon ? data.icon : item.icon"
          ></i>
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{
            item.label
          }}</span>
          <i
            *ngIf="item.items && collapsed"
            class="menu-collapse-icon"
            [ngClass]="
              !item.expanded
                ? 'fa-solid fa-chevron-up'
                : 'fa-solid fa-chevron-down'
            "
          >
          </i>
        </a>
        <a
          class="sublevel-nav-link"
          *ngIf="!item.items || (item.items && item.items.length === 0)"
          (click)="clickAction()"
          [routerLink]="[item.routeLink]"
          routerLinkActive="active-sublevel"
          [routerLinkActiveOptions]="{ exact: true }"
          [pTooltip]="item.label"
        >
          <i
            class="sublevel-link-icon"
            [ngClass]="!item.icon ? data.icon : item.icon"
          ></i>
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{
            item.label
          }}</span>
        </a>
        <div *ngIf="item.items && item.items.length > 0">
          <ha-sublevel-menu
            (oClick)="clickAction()"
            [data]="item"
            [collapsed]="collapsed"
            [multiple]="multiple"
            [expanded]="item.expanded"
          ></ha-sublevel-menu>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['../sidenav.component.css'],
  animations: [
    fadeInOut,
    trigger('submenu', [
      state(
        'hidden',
        style({
          height: '0',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
          overflow: 'hidden',
        })
      ),
      transition('visible <=> hidden', [animate('{{transitionParams}}')]),
      transition('void => *', animate(0)),
    ]),
  ],
})
export class SublevelMenuComponent implements OnInit {
  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: [],
  };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple = false;

  @Output() oClick: EventEmitter<MouseEvent> = new EventEmitter();

  ngOnInit(): void {
    return;
  }

  clickAction() {
    this.oClick.emit();
  }

  handleClick(item: INavbarData): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (const modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }
}
