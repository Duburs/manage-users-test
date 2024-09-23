import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UsersDataService } from '../data/users-data.service';

interface UserForm {
  role: FormControl<string | null>;
  username: FormControl<string | null>;
}

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss',
})
export class AddUsersComponent {
  fb = inject(FormBuilder);
  usersDataService = inject(UsersDataService);

  addUserForm: FormArray<FormGroup<UserForm>> = this.fb.array<
    FormGroup<UserForm>
  >([]);

  constructor() {
    this.addNewUser();
  }

  addNewUser(): void {
    this.addUserForm.push(
      this.fb.group<UserForm>({
        username: this.fb.control('', {
          validators: [Validators.required, Validators.minLength(1)],
        }),
        role: this.fb.control('', {
          validators: [Validators.required, Validators.minLength(1)],
        }),
      })
    );
  }

  remove(index: number): void {
    this.addUserForm.removeAt(index - 1);
  }

  submit(): void {
    this.addUserForm.markAllAsTouched();
    this.addUserForm.updateValueAndValidity();
    if (!this.addUserForm.valid) {
      return;
    }

    let data = this.addUserForm.value as User[];
    this.usersDataService.addUsers(data);
  }
}
