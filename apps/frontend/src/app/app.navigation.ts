export interface INavbarData {
  routeLink: string;
  icon?: string;
  label: string;
  expanded?: boolean;
  items?: INavbarData[];
  roles?: string[];
}
// Change
export const navbarData: INavbarData[] = [
  {
    routeLink: 'home',
    icon: 'fa-regular fa-house',
    label: 'Home',
  },
  {
    routeLink: 'tasks',
    icon: 'fa-regular fa-tasks',
    label: 'Tasks',
  },
];
