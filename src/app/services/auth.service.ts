import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null;
  public authChange = new Subject<boolean>();

  constructor(private router: Router) { }

  /**
   * @description Method for logging user in
   * @param {Object} authData - data for authentication
   */
  login(authData: AuthData) {
    // TODO Will be updated once we implement logic for Firebase
    this.user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: authData.email
    }
    this.authSuccessfully();
  }


  /**
   * @description Method for signup of a user
   * @param {Object} authData - data for registration
   */
  register(authData: AuthData) {
    // TODO Will be updated once we implement logic for Firebase
    this.user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: authData.email
    }
    this.authSuccessfully();
  }

  /**
   * @description Method for logging user out
   */
  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * @description Method for checking if user is authenticated
   * @returns Returns true if user is authenticated, false otherwise
   */
  isAuth(): boolean {
    return this.user != null;
  }

  /**
   * @description Method called when user authenticates successfully
   */
  authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/running']);
  }

  /**
   * @description Getter for user property
   */
  getUser() {
    return {...this.user};
  }

}
