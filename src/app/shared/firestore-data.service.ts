import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {getFirestore, updateDoc} from "firebase/firestore";
import {User} from '../model/user';
import {AuthService} from '../auth/auth.service';
import {first, map, Observable} from "rxjs";
import {Job} from "../model/job";
import {db} from 'src/environments/firebase';
import {Course} from '../model/course';
import {NotificationsService} from "angular2-notifications";

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  db = getFirestore();

  constructor(private _afs: AngularFirestore, private authService: AuthService,
              private notifications: NotificationsService) {
  }

  async addUserSkills(user: User) {
    await this.authService.updateProfileUrl(user.character)
    await this._afs.collection('/user_skills').doc(user.uid).set({
      skills: user.skills,
      trait: user.trait
    });
  }

  async updateUserSkills(skill: any) {
    let user = this.authService.userData;
    let userData = JSON.parse(localStorage.getItem('userData')!);
    userData.skills.push(skill);
    await this._afs.collection('/user_skills').doc(user.uid).update({skills: userData.skills})
  }

  async addUserJobs(user: any) {
    await this._afs.collection('/user_jobs').doc(user.uid).set({
      jobs: user.jobs,
    }).catch((e) => {
      this.notifications.error(
        'Erro',
        e.message,
      )
    });
  }

  async updateUserJobs(user: any) {
    await this._afs.collection('/user_jobs').doc(user.uid).update({jobs: user.jobs}).catch((e) => {
      this.notifications.error(
        'Erro',
        e.message,
      )
    });
  }

  async userHasJobs(userUID: any): Promise<boolean> {
    const userRef = await this._afs.collection('/user_jobs').doc(userUID).ref.get();
    return userRef.exists;
  };

  async getUserJobById(userUID: any) {
    const doc = await this._afs.collection<any>('/user_jobs').doc(userUID).ref.get();
    return doc.data();
  }

  getUsers() {
    return this._afs.collection('/user_skills').snapshotChanges();
  }

  async userHasProfile(user: any): Promise<boolean> {
    const userRef = await this._afs.collection('/user_skills').doc(user.uid).ref.get();
    if (userRef.exists) {
      return true;
    } else {
      return false;
    }
  };

  async getUserByUid() {
    let loggedUser = this.authService.isLoggedIn();
    const doc = await this._afs.collection('/user_skills').doc(loggedUser.uid).ref.get();
    localStorage.removeItem('userData');
    localStorage.setItem('userData', JSON.stringify(doc.data()));
  }

  // updateCharacter(username: any, character: any, userId: any){
  //   this._afs.collection('user_skills').doc(userId).ref.get().then((doc) => {
  //     localStorage.setItem('userData', JSON.stringify(doc.data()));
  //   });
  // }

  // getJob() {
  //   return this._afs.collection('/Jobs').stateChanges();
  // }

  getJobs(): Observable<Job[]> {
    return this._afs.collection<Job>('Jobs').valueChanges();
  }

  // addJob(job: Job) {
  //   return  this._afs.collection('/Jobs').doc(job.title).set({
  //     title: job.title,
  //     requirements: job.requirements,
  //     description: job.description,
  //   });
  // }
  getCourses(): Observable<Course[]> {
    return this._afs.collection<Course>('Courses').valueChanges();
  }

  async getCourseById(courseId: string) {
    const doc = await this._afs.collection<Course>('/Courses').doc(courseId).ref.get();
    return doc.data();
  }
}
