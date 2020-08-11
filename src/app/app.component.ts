import { Component } from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-dashboard';
  constructor(public authService: AuthService) {}
  logout = function() {return this.logout(); }.bind(AuthService);
}
