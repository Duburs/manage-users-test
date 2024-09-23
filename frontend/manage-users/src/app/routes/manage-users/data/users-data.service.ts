import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User {
  role: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  private firestore = inject(Firestore);

  private userCollection = collection(this.firestore, 'users');

  users$: Observable<User[]>;

  constructor(firestore: Firestore) {
    this.users$ = collectionData(this.userCollection);
  }

  addUsers(users: User[]): void {
    /*     var db = firebase.firestore();
var batch = db.batch()


array.forEach((doc) => {
  var docRef = db.collection("col").doc(); //automatically generate unique id
  batch.set(docRef, doc);
});


batch.commit() */
  }
}
