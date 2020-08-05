import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from 'firebase';
import {NavigationStart, RouteConfigLoadEnd, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  currentUser: BehaviorSubject<User>;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public afAuth: AngularFireAuth, public router: Router){
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = new BehaviorSubject<User>(user);
        this.user = this.currentUser.asObservable();
        this.loggedIn.next(true);
      } else {
        this.user = null;
        this.currentUser = new BehaviorSubject<firebase.User>(null);
        this.loggedIn.next(false);
      }
    });
  }
  public get userValue(): User {
    return this.currentUser.value;
  }
  async login(){
    await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.router.navigate(['dashboard']);
  }
  logout() {
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }
  get isAuth() {
    return this.loggedIn.asObservable();
  }
}
