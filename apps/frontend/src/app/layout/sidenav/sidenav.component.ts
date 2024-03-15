import { fadeInOut, rotate } from './sidenav.animations';
import { INavbarData } from './sidenav.interface';
import { SublevelMenuComponent } from './sublevel/sublevel.component';
import { navbarData } from '../../app.navigation';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { Router, RouterModule } from '@angular/router';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  Input,
  OnChanges,
} from '@angular/core';

import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { APP_THEME } from '../../app.settings';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'ha-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, SublevelMenuComponent, TooltipModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    fadeInOut,
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
    ]),
    rotate,
    trigger('rotateBottom', [
      transition(':enter', [
        animate(
          '250ms',
          keyframes([
            style({ transform: 'rotate(180deg)', offset: '0' }),
            style({ transform: 'rotate(1turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit, OnChanges {
  /**
   * Is used to transfer values to the body component through the app component
   */
  @Output() oToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  /**
   * If false the Logo and the Title will be hidden
   */
  @Input() showLogo = true; //
  /**
   * This will be shown if no logoURL is set
   */
  @Input() shortLogo = 'DT';
  /**
   * Title
   */
  @Input() appTitle = 'Default Title';
  /**
   * Logo URL if set the Logo will be shown otherwise the shortLogo will be shown
   *
   */
  @Input() logoURL = '';
  /**
   * Shows the bottom icon to expand and collapse the side menu
   */
  @Input() showBottomButton = true;
  /**
   * The Sublevel links will be collapsed when the menu is closing
   */
  @Input() collapseSublevelOnClose = true;
  /**
   * If the user selects a link the sidenav will be closed
   */
  @Input() closeSidenavOnClick = true;
  /**
   * If the sidenav is closed it will be opened when the usr clicks on a link folder
   */
  @Input() expandSublevelOnClick = true;

  @Input() useLogoAsLink = false;
  @Input() logoRouteLink = '';
  @Input() loginDisplay = false;

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple = false;
  switchLogo = false;
  themeColor = `background-color:${APP_THEME().split('|')[0]}`;

  constructor(private router: Router) {}

  canAccess(): boolean {
    return true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(event);
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.oToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    console.log(window.innerWidth);
    this.screenWidth = window.innerWidth;

    if (this.logoURL) {
      this.switchLogo = true;
    }
  }
  ngOnChanges(): void {
    console.log('Changes done');
    console.log('LoginDisplay:', this.loginDisplay);
    if (this.loginDisplay) {
      this.navData = navbarData;
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.oToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
    // if (this.collapseSublevelOnClose) {
    //   for (const modelItem of this.navData) {
    //     if (modelItem.expanded) {
    //       modelItem.expanded = false;
    //     }
    //   }
    // }
  }

  toggleCollapseOnSelect(): void {
    if (this.closeSidenavOnClick) {
      this.collapsed = false;
      this.oToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  expandSublevel(): void {
    if (
      (this.showBottomButton || this.showLogo || this.closeSidenavOnClick) &&
      this.expandSublevelOnClick
    ) {
      this.collapsed = true;
      this.oToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  handleClick(item: INavbarData): void {
    if (this.collapsed) {
      if (!this.multiple) {
        for (const modelItem of this.navData) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
      item.expanded = !item.expanded;
    }

    if (!this.collapsed) {
      if (!this.multiple) {
        for (const modelItem of this.navData) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
      item.expanded = true;
    }
    this.expandSublevel();
  }

  logoNavigateTo(routeLink: string) {
    console.log(routeLink);
    this.toggleCollapseOnSelect();
    this.router.navigate([routeLink]);
  }
}
