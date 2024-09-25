import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  User,
  UserCredential,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  private user$: Observable<User | null> = new Observable((obs) => {
    return this.auth.onAuthStateChanged(
      (user) => {
        return obs.next(user);
      },
      (err) => obs.error(err),
      () => obs.complete()
    );
  });

  isLoggedIn$ = this.user$.pipe(map((user) => !!user));
  isLoggedIn = toSignal(this.isLoggedIn$);

  private user = toSignal(this.user$);

  uid = computed(() => {
    return this.user()?.displayName ?? 'anonymous';
  });

  byGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  anonymously(): Promise<UserCredential> {
    return signInAnonymously(this.auth);
  }

  logout(): void {
    this.auth.signOut();
  }
}
