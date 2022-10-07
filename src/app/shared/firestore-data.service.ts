import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { db } from 'src/environments/firebase';
import { doc, setDoc, QuerySnapshot } from "firebase/firestore"; 
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  constructor(private _afs: AngularFirestore) {
   }
   
  addUser(user: User) {
   return  this._afs.collection('/User').doc(user.uid).set({
      name: user.name,
      email: user.email,
      character: user.character,
      skills: user.skills
    });
  }
  getUsers(){
    return this._afs.collection('/User').snapshotChanges();
  }
  getUserByUid(user: any): boolean {
    this._afs.collection('/User').doc(user.uid).ref.get().then((doc) =>{
      return doc.exists;
    });
    return false;
  }
}
