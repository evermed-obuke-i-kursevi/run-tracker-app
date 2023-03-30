import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  maxDate: any;

  constructor(private authService: AuthService) {

  }

  onSubmitSignup(form: NgForm) {
    const {email, password} = form.value;
    const authData = {
      email,
      password
    }
    this.authService.register(authData);
  }

  ngOnInit() {
    const today = new Date();
    this.maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDay()
    );
  }

}
