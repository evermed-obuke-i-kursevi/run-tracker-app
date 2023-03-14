import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  constructor(private authService: AuthService) {

  }

  onSubmitLogin(form: NgForm) {
    console.log(form);
    const {email, password} = form.value;
    const authData = {
      email,
      password
    }
    this.authService.login(authData);
  }
}
