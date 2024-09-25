import { inject, Injectable } from '@angular/core';
import {
  Firestore,
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
import {
  BehaviorSubject,
  catchError,
  from,
  map,
  Observable,
  switchMap,
} from 'rxjs';

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

  // BehaviorSubject which stores the current data source of the users
  // It can either be the entire collection or a filtered collection.
  private currentDataSource$ = new BehaviorSubject<SourceType>(SourceType.ALL);

  // Collection reference to the users
  private userCollection = collection(this.firestore, 'users');

  allUsers$: Observable<User[]> = collectionData(this.userCollection, {
    idField: 'id',
  });
  filteredUsers$!: Observable<User[]>;

  // Anything listening to this observable will get the current data source and won't have to
  // worry about the implementation details of how the data is being fetched.
  currentData$: Observable<User[]> = this.currentDataSource$.pipe(
    switchMap((source) => {
      if (source === SourceType.ALL) {
        return this.allUsers$;
      }
      return this.filteredUsers$;
    })
  );

  // Adds users to the user collection
  addUsers(users: User[]): Observable<void> {
    let batch = writeBatch(this.firestore);
    users.forEach((user) => {
      const _user = { creation_date: new Date(), enabled: true, ...user };
      batch.set(doc(this.userCollection), _user);
    });
    return from(batch.commit());
  }

  updateUser(user: User): Observable<void> {
    // Directly update the user in the database, for now it'll just rewrite
    // the entire user object.
    return from(updateDoc(doc(this.userCollection, user.id), { ...user }));
  }

  // Sets filters and updates the data source
  filterData(username: string, role: string): void {
    if (!username && !role) {
      this.clearFilters();
      return;
    }

    let q = query(this.userCollection);

    /** These queries should be doing a prefix search https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search
     * Obviously it would probably be more efficient to use a search engine like ElasticSearch */

    if (role) {
      q = query(
        q,
        where('role', '>=', role),
        where('role', '<=', role + '\uf8ff')
      );
    }

    if (username) {
      q = query(
        q,
        where('username', '>=', username),
        where('username', '<=', username + '\uf8ff')
      );
    }

    this.filteredUsers$ = from(collectionData(q, { idField: 'id' }));

    // Sets the observable to the new filtered users
    this.currentDataSource$.next(SourceType.FILTERED);
  }

  removeUser(userId: string): any {
    from(httpsCallable(this.functions, 'removeUser')({ id: userId })).subscribe(
      {
        // If it doesn't error it's a success
        next: (res: any) => {},
        error: (err) => {
          // This can be an auth error or a server error
          alert('Failed to remove user');
          return err;
        },
      }
    );
  }

  clearFilters() {
    this.currentDataSource$.next(SourceType.ALL);
  }
}
