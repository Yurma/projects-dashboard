import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

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
