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
    return this.authService.projectsValue.value[this.authService.selectedProject].name || '';
  }

  get projectDescription() {
    return this.authService.projectsValue.value[this.authService.selectedProject].description || '';
  }

  newForm = new FormGroup({
    projectName: new FormControl(this.projectName || ''),
    projectDescription: new FormControl(this.projectDescription || '')
  });

  onSubmit() {
    this.authService.editProject(this.newForm);
  }

  ngOnInit(): void {
  }

}
