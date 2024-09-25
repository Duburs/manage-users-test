import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UsersDataService } from '../data/users-data.service';
import { Router } from '@angular/router';
import { Roles } from '../roles.interface';
import { DropdownComponent } from '../../../components/dropdown/dropdown.component';

type AddRoles = 'Select a role' | Roles;

interface UserForm {
  role: FormControl<AddRoles | null>;
  username: FormControl<string | null>;
}

const selectedRoleValidator: ValidatorFn = (
  formGroup: AbstractControl
): ValidationErrors | null => {
  const role = formGroup.value;
  if (
    role === 'Select a role' ||
    role === !Object.values(Roles).includes(role)
  ) {
    return { role: 'Please select a role' };
  }
  return null;
};

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss',
})
export class AddUsersComponent {
  fb = inject(FormBuilder);
  usersDataService = inject(UsersDataService);
  router = inject(Router);

  roles = Object.values(Roles);

  addUserForm: FormArray<FormGroup<UserForm>> = this.fb.array<
    FormGroup<UserForm>
  >([]);

  constructor() {
    this.addNewUser();
  }

  // Adds a new entry to the form array which represents one user.
  addNewUser(): void {
    this.addUserForm.push(
      this.fb.group<UserForm>({
        username: this.fb.control('', {
          validators: [Validators.required, Validators.minLength(1)],
        }),
        role: this.fb.control('Select a role', {
          validators: [
            selectedRoleValidator,
            Validators.required,
            Validators.minLength(1),
          ],
        }),
      })
    );
  }

  remove(index: number): void {
    this.addUserForm.removeAt(index);
  }

  submit(): void {
    this.addUserForm.markAllAsTouched();
    this.addUserForm.updateValueAndValidity();
    if (!this.addUserForm.valid) {
      return;
    }

    let data = this.addUserForm.value as User[];
    this.usersDataService.addUsers(data).subscribe({
      next: () => {
        this.addUserForm.clear();
        this.router.navigate(['/manage-users/view']);
      },
      error: (err) => {
        // Should push to a notification type service which doesn't exist yet.
        alert('An error occurred');
      },
    });
  }
}
