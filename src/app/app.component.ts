import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-dashboard';
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
}
