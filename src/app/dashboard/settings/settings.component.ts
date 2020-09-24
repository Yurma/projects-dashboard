import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(public authService: AuthService) { }

  get projectName() {
    return this.authService.selectedProject.name || '';
  }

  get projectDescription() {
    return this.authService.selectedProject.description || '';
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

  newForm = new FormGroup({
    projectName: new FormControl(this.projectName || ''),
    projectDescription: new FormControl(this.projectDescription || ''),
    projectRepo: new FormControl(this.projectRepo || ''),
    projectWebsite: new FormControl(this.projectWebsite || '')
  });

  onSubmit() {
    this.authService.editProject(this.newForm);
  }

  deleteClick() {
    const input = prompt(`Enter "${this.projectName}" to delete project.`);
    if (input === this.projectName){
      this.authService.removeProject();
    } else {
      if (input === null) return;
      if (confirm('You entered wrong project name, please try again')) {
        this.deleteClick();
      }
    }
  }

  ngOnInit(): void {
  }

}
