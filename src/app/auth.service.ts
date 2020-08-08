import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from 'firebase';
import {NavigationStart, RouteConfigLoadEnd, Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import Item = firebase.analytics.Item;
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  currentUser: BehaviorSubject<User>;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  projects: Observable<Item[]>;
  projectsValue: BehaviorSubject<Item[]>;
  selectedProject: number = null;

  constructor(public afAuth: AngularFireAuth, public router: Router, public fstore: AngularFirestore){
    this.updateUserData();
  }
  public get isSelected(): boolean {
    return !!this.selectedProject;
  }
  public get userValue(): User {
    console.log(this.currentUser.value);
    console.log(this.projectsValue.value);
    return this.currentUser.value;
  }
  public get userItems(): Item[] {
    if (this.projectsValue) {
      return this.projectsValue.value;
    }
    return [];
  }
  async login(){
    await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.updateUserData();
  }
  logout() {
    this.afAuth.signOut();
    this.selectedProject = null;
    this.router.navigate(['login']);
  }
  get isAuth() {
    return this.loggedIn.asObservable();
  }
  private updateUserData() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = new BehaviorSubject<User>(user);
        this.user = this.currentUser.asObservable();
        this.loggedIn.next(true);
        this.router.navigate(['dashboard']);
      } else {
        this.user = null;
        this.currentUser = new BehaviorSubject<firebase.User>(null);
        this.loggedIn.next(false);
      }
      this.projects = this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').valueChanges();
      this.projects.subscribe(res => {
        this.projectsValue = new BehaviorSubject<Item[]>(res);
      });
    });
    return;
  }
}
