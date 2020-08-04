import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {User} from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public afAuth: AngularFireAuth){
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = undefined;
      }
    });
  }
  async login(){
    await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.signOut();
  }
}
