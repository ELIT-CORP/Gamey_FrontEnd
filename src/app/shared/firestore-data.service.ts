import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { db } from 'src/environments/firebase';
import { getFirestore, doc, setDoc, QuerySnapshot, getDoc } from "firebase/firestore"; 
import { User } from '../model/user';
import { AuthService } from '../auth/auth.service';
import { Course } from '../model/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  db = getFirestore();

  constructor(private _afs: AngularFirestore, private authService: AuthService) {
   }
   
  async addUser(user: User) {
    await this.authService.updateProfileUrl(user.character)
    await this._afs.collection('/user_skills').doc(user.uid).set({
      skills: user.skills,
      trait: user.trait
     });
   }

   getUsers(){
     return this._afs.collection('/user_skills').snapshotChanges();
   }
 
   async userHasProfile(user: any) : Promise<boolean> {
     const userRef = await this._afs.collection('/user_skills').doc(user.uid).ref.get();
      if(userRef.exists){
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

  getCourses(): Observable<Course[]> {
    return this._afs.collection<Course>('Courses').valueChanges();
  }
  async getCourseById(courseId: string) {
    const doc = await this._afs.collection<Course>('/Courses').doc(courseId).ref.get();
    return doc.data();
  }
}
