import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from 'firebase';
import {NavigationStart, RouteConfigLoadEnd, Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import Item = firebase.analytics.Item;
import {AngularFireDatabase} from '@angular/fire/database';
import {K} from '@angular/cdk/keycodes';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  currentUser: BehaviorSubject<User>;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  projects: Observable<Item[]>;
  projectsValue: BehaviorSubject<any[]>;
  selectedProject: number = null;
  selectedId: string = null;

  constructor(public afAuth: AngularFireAuth, public router: Router, public fstore: AngularFirestore){
    this.updateUserData();
  }
  public get isSelected(): boolean {
    return !!this.selectedProject;
  }
  public get userValue(): User {
    console.log(this.currentUser.value);
    console.log(this.projectsValue.value);
    console.log(this.selectedId);
    return this.currentUser.value;
  }
  public get userItems(): Item[] {
    if (this.projectsValue) {
      return this.projectsValue.value;
    }
    return [];
  }
  public get boardsArray(): any[] {
    return this.projectsValue.value[this.selectedProject].boards || [];
  }
  async login(){
    await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.updateUserData();
  }
  selectProject(value) {
    this.selectedProject = value;
    if (value) this.selectedId = this.projectsValue.value[value].id;
    else this.selectedId = null;
  }
  logout() {
    this.afAuth.signOut();
    this.selectedProject = null;
    this.selectedId = null;
    this.router.navigate(['login']);
  }
  newProject(form) {
    const name = form.get('projectName').value;
    const description = form.get('projectDescription').value;
    this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').add({"name": name, "description": description});
  }
  saveBoards(value) {
    this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').doc(this.selectedId).update({"boards": value});
  }
  editProject(form) {
    const name = form.get('projectName').value;
    const description = form.get('projectDescription').value;
    this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').doc(this.selectedId).update({"name": name, "description": description});
    console.log(this.selectedId)
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
      this.projects = this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').valueChanges({idField: 'id'});
      this.projects.subscribe(res => {
        this.projectsValue = new BehaviorSubject<Item[]>(res);
      });
    });
    return;
  }
}
