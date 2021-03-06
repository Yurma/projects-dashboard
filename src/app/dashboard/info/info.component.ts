import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(public authService: AuthService) { }

  get projectName() {
    if (this.authService.selectedProject){
      return this.authService.selectedProject.name || '';
    }
    return '';
  }

  get projectDescription() {
    if (this.authService.selectedProject){
      return this.authService.selectedProject.description || '';
    }
    return '';
  }

  get projectRepo() {
    if (this.authService.selectedProject) {
      return this.authService.selectedProject.repo || '';
    }
    return null;
  }
  get projectWebsite() {
    if (this.authService.selectedProject) {
      return this.authService.selectedProject.website || '';
    }
    return null;
  }


  ngOnInit(): void {
  }

}
