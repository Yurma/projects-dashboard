import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {AuthGuard} from './guards/auth.guard';
import {UserResolve} from './user.resolve';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {InfoComponent} from './dashboard/info/info.component';
import {BoardsComponent} from './dashboard/boards/boards.component';
import {SettingsComponent} from './dashboard/settings/settings.component';
import {NewComponent} from './dashboard/new/new.component';
import {SelectedGuard} from './guards/selected.guard';
import {SelectComponent} from './dashboard/select/select.component';
import {NotSelectedGuard} from './guards/not-selected.guard';


const routes: Routes = [
  {
    path: '', children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard], children: [
          { path: '', component: SelectComponent, canActivate: [NotSelectedGuard], pathMatch: 'full' },
          { path: 'info', component: InfoComponent, canActivate: [SelectedGuard] },
          { path: 'boards', component: BoardsComponent, canActivate: [SelectedGuard] },
          { path: 'settings', component: SettingsComponent, canActivate: [SelectedGuard] },
          { path: 'new', component: NewComponent }
          ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
