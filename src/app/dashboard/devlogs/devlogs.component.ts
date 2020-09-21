import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-devlogs',
  templateUrl: './devlogs.component.html',
  styleUrls: ['./devlogs.component.scss']
})
export class DevlogsComponent implements OnInit {
  newForm = new FormGroup({
    logTitle: new FormControl(''),
    logDescription: new FormControl('')
  });

  constructor(public authServices: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authServices.newLog(this.newForm);
  }

}
