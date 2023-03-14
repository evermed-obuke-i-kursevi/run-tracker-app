import { Subscription } from 'rxjs';
import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() closeSideNav = new EventEmitter();
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(public authService: AuthService) {

  }

  /**
   * @description Handler for logout click
   */
  onLogout() {
    this.authService.logout();
    this.closeSideNav.emit();
  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
