import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private user: User | null;

  private isAuthenticated: boolean;
  public authChange = new Subject<boolean>();

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private authFirestore: AngularFireAuth) { }

  /**
   * @description Method for listening authentication change event
   */
  initAuthListener() {
    this.authFirestore.authState
      .subscribe(user => {
        if (user) {
          this.isAuthenticated = true;
          this.authChange.next(true);
        } else {
          this.isAuthenticated = false;
          this.authChange.next(false);
        }
      });
  }

  /**
   * @description Method for logging user in
   * @param {Object} authData - data for authentication
   */
  async login(authData: AuthData) {
    try {
      const response = await this.authFirestore.signInWithEmailAndPassword(authData.email, authData.password)
      console.log(response);
      this.authSuccessfully(`You have successfully logged in.`);
    } catch (error: any) {
      console.log(error);
      this.authUnsuccessfully(error.message)
    }
  }


  /**
   * @description Method for signup of a user
   * @param {Object} authData - data for registration
   */
  async register(authData: AuthData) {
    try {
      const response = await this.authFirestore.createUserWithEmailAndPassword(authData.email, authData.password);
      console.log(response);
      this.authSuccessfully(`Dear ${authData.email}, your account is successfully created!`)
    } catch (error: any) {
      console.log(error);
      this.authUnsuccessfully(error.message); // ! tekst greske uvek dolazi sa servera
      // this.authUnsuccessfully(`Your account was not created. Please try again`);
    }
  }

  /**
   * @description Method for logging user out
   */
  logout() {
    this.authFirestore.signOut();
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.snackBar.open(`You have successfully logged out!`, 'Close', {
      duration: 3000
    });
  }

  /**
   * @description Method for checking if user is authenticated
   * @returns {boolean} - Returns true if user is authenticated, false otherwise
   */
  isAuth(): boolean {
    return this.isAuthenticated;
  }

  /**
   * @description Method called when user authenticates successfully
   * @param {string} message - message for snack bar popup
   */
  authSuccessfully(message: string) {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/running']);
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

  /**
   * @description Method called after failed login/register
   * @param {string} message - message for snack bar popup
   */
  authUnsuccessfully(message: string) {
    this.isAuthenticated = false;
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

}
