import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthService} from './auth.service';
import { InfoComponent } from './dashboard/info/info.component';
import { BoardsComponent } from './dashboard/boards/boards.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { NewComponent } from './dashboard/new/new.component';
import { SelectComponent } from './dashboard/select/select.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { MarkdownModule } from 'ngx-markdown';
import { DevlogsComponent } from './dashboard/devlogs/devlogs.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    InfoComponent,
    BoardsComponent,
    SettingsComponent,
    NewComponent,
    SelectComponent,
    DevlogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    DragDropModule,
    MarkdownModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
