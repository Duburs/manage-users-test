import { inject, Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import {
  Firestore,
  Query,
  collection,
  collectionData,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { BehaviorSubject, from, map, Observable, switchMap, tap } from 'rxjs';

export interface User {
  role: string;
  username: string;
  creation_date?: { seconds: number; nanoseconds: number };
  id: string;
}

enum SourceType {
  ALL = 'all',
  FILTERED = 'filtered',
}

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  private firestore = inject(Firestore);
  private functions = inject(Functions);

  private currentDataSource$ = new BehaviorSubject<SourceType>(SourceType.ALL);

  private userCollection = collection(this.firestore, 'users');

  allUsers$: Observable<User[]> = collectionData(this.userCollection, {
    idField: 'id',
  });
  filteredUsers$!: Observable<User[]>;

  currentData$: Observable<User[]> = this.currentDataSource$.pipe(
    switchMap((source) => {
      if (source === SourceType.ALL) {
        return this.allUsers$;
      }
      return this.filteredUsers$;
    })
  );

  addUsers(users: User[]): Observable<void> {
    let batch = writeBatch(this.firestore);
    users.forEach((user) => {
      const _user = { creation_date: new Date(), disabled: false, ...user };
      batch.set(doc(this.userCollection), _user);
    });
    return from(batch.commit());
  }

  updateUser(user: User): Observable<void> {
    // Directly update the user in the database, for now it'll just rewrite
    // the entire user object.
    return from(updateDoc(doc(this.userCollection, user.id), { ...user }));
  }

  filterData(username: string, role: string): void {
    if (!username && !role) {
      this.clearFilters();
      return;
    }

    let q = query(this.userCollection);
    if (role) {
      q = query(
        q,
        where('role', '>=', role),
        where('role', '<=', role + '\uf8ff')
      );
    }

    if (username) {
      /** This should be doing a prefix search https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search
       * Obviously it would probably be more efficient to use a search engine like ElasticSearch */
      q = query(
        q,
        where('username', '>=', username),
        where('username', '<=', username + '\uf8ff')
      );
    }

    this.filteredUsers$ = from(getDocs(q)).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data()) as User[];
      })
    );

    // Sets the observable to the new filtered users
    this.currentDataSource$.next(SourceType.FILTERED);
  }

  removeUser(userId: string): any {
    httpsCallable(this.functions, 'removeUser')();
  }

  clearFilters() {
    this.currentDataSource$.next(SourceType.ALL);
  }
}
