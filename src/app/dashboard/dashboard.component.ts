import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  sidebarOn = true;
  projectChange(e) {
    if (e.target.value === 'new') {
      this.authService.selectProject(null);
      this.router.navigate(['/dashboard/new']);
    } else if (e.target.value === 'select') {
      this.authService.selectProject(null);
      this.router.navigate(['dashboard']);
    } else {
      this.authService.selectProject(e.target.value);
      //this.router.navigate(['/dashboard/info'], {queryParams: {project: this.authServices.selectedId}});
    }
  }

  toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('hidden')) {
      sidebar.classList.remove('hidden');
      sidebar.classList.add('show');
    } else {
      sidebar.classList.add('hidden');
      sidebar.classList.remove('show');
    }
  }
  ngOnInit(): void {
  }

}
