import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersDataService } from './data/users-data.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
})
export class ManageUsersComponent {
  constructor(public usersDataService: UsersDataService) {}
}
