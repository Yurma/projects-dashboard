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
    return this.authService.projectsValue.value[this.authService.selectedProject].name || "";
  }

  get projectDescription() {
    return this.authService.projectsValue.value[this.authService.selectedProject].description || "";
  }

  ngOnInit(): void {
  }

}
