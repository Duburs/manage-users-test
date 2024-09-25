import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private auth = inject(Auth);

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

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
