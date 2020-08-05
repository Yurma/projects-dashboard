import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService) { }

  sidebarOn = true;

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
