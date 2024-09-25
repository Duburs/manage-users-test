import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public authService: AuthService) {}

  byGoogle(): void {
    this.authService.byGoogle();
  }

  anonymously(): void {
    this.authService.anonymously();
  }

  logout(): void {
    this.authService.logout();
  }
}
