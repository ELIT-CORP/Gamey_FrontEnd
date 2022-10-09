import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { db } from 'src/environments/firebase';
import { getFirestore, doc, setDoc, QuerySnapshot, getDoc } from "firebase/firestore"; 
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  db = getFirestore();

  constructor(private _afs: AngularFirestore) {
   }
   
  addUser(user: User) {
   return  this._afs.collection('/User').doc(user.uid).set({
      name: user.name,
      email: user.email,
      character: user.character,
      skills: user.skills,
      level: 1,
      experience: 0,
      trait: user.trait
    });
  }
  getUsers(){
    this._afs.collection('/User').snapshotChanges();
  }

  userHasProfile(user: any): any {
    this._afs.collection('/User').doc(user.uid).ref.get().then((doc) => {
      return doc.exists;
    }, e => {
      return null;
    });
  }

  getUserByUid() {
    let loggedUser = JSON.parse(localStorage.getItem('user')!);
    this._afs.collection('/User').doc(loggedUser.uid).ref.get().then((doc) => {
      localStorage.setItem('userData', JSON.stringify(doc.data()));
    });
  }
}
