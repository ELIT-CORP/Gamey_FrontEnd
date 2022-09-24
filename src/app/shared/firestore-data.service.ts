import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../model/user';
 import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  
  constructor(private _afs: AngularFirestore) {
   }
   addUser(user: User) {
    return  this._afs.collection('/User').add(user);
   }
   getUsers(){
     return this._afs.collection('/Users').snapshotChanges();
   }
}
