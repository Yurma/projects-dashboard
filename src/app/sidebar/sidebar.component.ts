import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public authServices: AuthService, public router: Router) { }
  public get currentRoute() {
    return this.router.url;
  }

  newClick() {
    this.authServices.selectProject(null);
    this.router.navigate(['/dashboard/new']);
  }
  projectChange(e) {
    if (e.target.value === 'new') {
      this.authServices.selectProject(null);
      this.router.navigate(['/dashboard/new']);
    } else if (e.target.value === 'select') {
      this.authServices.selectProject(null);
      this.router.navigate(['dashboard']);
    } else {
      this.authServices.selectProject(e.target.value);
      //this.router.navigate(['/dashboard/info'], {queryParams: {project: this.authServices.selectedId}});
    }
  }
  ngOnInit(): void {
  }

}
