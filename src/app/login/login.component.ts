import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  login() {
    this.authService.login();
    console.log(this.authService.user);
  }


  ngOnInit(): void {
  }

}
