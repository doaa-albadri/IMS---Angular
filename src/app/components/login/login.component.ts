import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username!: string;
  password!: any;

  login() {
    console.log({ username: this.username, password: this.password });
    this.username = '';
    this.password = '';
  }
}
