import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsersComponent } from './view-users.component';
import { UsersDataService } from '../data/users-data.service';
import { provideRouter } from '@angular/router';

describe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let fixture: ComponentFixture<ViewUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUsersComponent],
      providers: [
        provideRouter([]),
        {
          provide: UsersDataService,
          useValue: {
            currentData$: { subscribe: () => {} },
            updateUser: (user: any) => {},
            filterData: (username: string, role: string) => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
