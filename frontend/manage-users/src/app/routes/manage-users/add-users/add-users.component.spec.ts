import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersComponent } from './add-users.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersDataService } from '../data/users-data.service';

describe('AddUsersComponent', () => {
  let component: AddUsersComponent;
  let fixture: ComponentFixture<AddUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUsersComponent],
      providers: [
        {
          provide: UsersDataService,
          useValue: {
            addUser: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add and remove users', () => {
    expect(component.addUserForm.length).toEqual(1);
    component.addNewUser();
    expect(component.addUserForm.length).toEqual(2);

    component.addNewUser();
    expect(component.addUserForm.length).toEqual(3);

    component.remove(0);

    expect(component.addUserForm.length).toEqual(2);
  });
});
