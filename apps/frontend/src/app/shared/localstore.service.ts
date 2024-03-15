import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface IProfileType {
  businessPhones?: string[] | string;
  displayName?: string;
  givenName?: string;
  id?: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: string;
  officeLocation?: string;
  preferredLanguage?: string;
  surname?: string;
  userPrincipalName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  profile: IProfileType | undefined;
  profilePictureUrl = '';
  roles: string[] = [];

  getUserRoles(): string[] {
    console.log('getUserRoles');
    try {
      const idToken = localStorage.getItem('idToken');
      if (idToken) {
        const decoded: any = jwtDecode(idToken);
        this.roles = decoded.roles as string[];
        console.log('UserRoles:', this.roles);
      } else {
        console.log('No idToken found in LocalStorage');
        // handling required?
      }
    } catch (err) {
      console.log('Error getUserRoles', err);
    }
    return this.roles;
  }
}
