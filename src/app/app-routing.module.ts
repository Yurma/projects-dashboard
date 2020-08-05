import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth.guard';
import {UserResolve} from './user.resolve';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';


const routes: Routes = [
  {
    path: '', children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard], children: [
          { path: '', component: DashboardComponent, pathMatch: 'full' },
          { path: 'info', component: DashboardComponent },
          { path: 'boards', component: DashboardComponent },
          { path: 'settings', component: DashboardComponent }
          ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
