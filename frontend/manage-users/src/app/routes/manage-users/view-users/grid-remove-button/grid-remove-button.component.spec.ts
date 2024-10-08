import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRemoveButtonComponent } from './grid-remove-button.component';
import { UsersDataService } from '../../data/users-data.service';

describe('GridRemoveButtonComponent', () => {
  let component: GridRemoveButtonComponent;
  let fixture: ComponentFixture<GridRemoveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridRemoveButtonComponent],
      providers: [
        {
          provide: UsersDataService,
          useValue: {
            removeUser: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GridRemoveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
