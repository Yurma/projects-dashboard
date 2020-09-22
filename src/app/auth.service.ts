import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject, Observable} from 'rxjs';
import {firestore, User} from 'firebase';
import {ActivatedRoute, NavigationStart, RouteConfigLoadEnd, Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import Item = firebase.analytics.Item;
import {AngularFireDatabase} from '@angular/fire/database';
import {K} from '@angular/cdk/keycodes';
import {type} from 'os';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  currentUser: BehaviorSubject<User>;

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  projects: Observable<Item[]>;
  projectsValue: any[];

  selectedKey: number = null;
  selectedId: string = null;
  selectedProject: { name: string, description: string } = { name: '', description: '' };

  logs: Observable<Item[]>;
  logsValue: BehaviorSubject<any[]>;

  constructor(public afAuth: AngularFireAuth, public router: Router, public fstore: AngularFirestore, public route: ActivatedRoute){
    this.updateUserData();
  }
  public get isSelected(): boolean {
    return this.selectedKey !== null;
  }
  public get userValue(): User {
    console.log(this.currentUser.value);
    console.log(this.projectsValue);
    console.log(this.selectedId);
    console.log(this.logsValue.value);
    console.log(this.selectedProject);
    return this.currentUser.value;
  }
  public get userItems(): Item[] {
    if (this.projectsValue) {
      return this.projectsValue;
    }
    return [];
  }
  public get boardsArray(): any[] {
    return this.projectsValue[this.selectedKey].boards || [];
  }
  async login(){
    await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.updateUserData();
  }
  loadLogs() {
    this.logs = this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').doc(this.selectedId).collection('logs').valueChanges({idField: 'id'});
    this.logs.subscribe(res => {
      this.logsValue = new BehaviorSubject<Item[]>(res);
    });
  }
  removeLog(id) {
    this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').doc(this.selectedId).collection('logs').doc(id).delete();
  }
  loadProject() {
    this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').doc(this.selectedId).valueChanges()
      .subscribe(res => {
        this.selectedProject = (new BehaviorSubject(res)).value || { name: '', description: '' };
      });
  }
  selectProject(value) {
    this.selectedKey = value;
    if (value !== null) {
      this.selectedId = this.projectsValue[value].id;
      this.loadProject();
      this.loadLogs();
      this.router.navigate(['/dashboard/info'], {queryParams: {project: this.selectedId}});
    } else {
      this.selectedId = null;
    }
    console.log(this.selectedKey, this.selectedId, this.isSelected);
  }
  logout() {
    this.afAuth.signOut();
    this.selectedKey = null;
    this.selectedId = null;
    this.router.navigate(['login']);
  }
  newProject(form) {
    const name = form.get('projectName').value;
    const description = form.get('projectDescription').value;
    this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').add({name, description})
                .then((docRef) => {
                  this.selectProject(this.projectsValue.map(proj => ({id: proj.id})).findIndex(obj => obj.id === docRef.id));
                  this.router.navigate(['/dashboard/info'], {queryParams: {project: docRef.id}});
                });
  }
  saveBoards(value) {
    this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').doc(this.selectedId).update({boards: value});
  }
  editProject(form) {
    const name = form.get('projectName').value;
    const description = form.get('projectDescription').value;
    this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').doc(this.selectedId).update({name, description});
    console.log(this.selectedId)
  }
  newLog(form) {
    const title = form.get('logTitle').value;
    const description = form.get('logDescription').value;
    const date = new Date();

    this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').doc(this.selectedId).collection('logs').add({
      title,
      description,
      date
    });
  }
  removeProject() {
    this.fstore.collection('users').doc<Item[]>(this.currentUser.value.uid).collection('projects').doc(this.selectedId).delete();
    this.selectProject(null);
    this.router.navigate(['dashboard'], { queryParamsHandling: 'preserve' });
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
        this.projectsValue = (new BehaviorSubject<Item[]>(res)).value.map(proj => ({id: proj.id, name: proj.name}));
      });
    });
    return;
  }
}
