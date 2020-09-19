import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  newForm = new FormGroup({
    projectName: new FormControl(''),
    projectDescription: new FormControl('')
  });

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.newProject(this.newForm);
  }

}
