import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideZoneChangeDetection } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase } from '@angular/fire/database';
import { provideFirestore } from '@angular/fire/firestore';
import { provideFunctions } from '@angular/fire/functions';
import { provideRouter } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { routes } from '../app.routes';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideFirebaseApp(() =>
          initializeApp({
            apiKey: 'AIzaSyANsSZBXXlfmTWxuG3T7oEX8HxGY59yMZI',
            authDomain: 'manage-users-tech-test-backend.firebaseapp.com',
            projectId: 'manage-users-tech-test-backend',
            storageBucket: 'manage-users-tech-test-backend.appspot.com',
            messagingSenderId: '838167386676',
            appId: '1:838167386676:web:de5a1cd9d728c366bdc861',
          })
        ),
        provideFirestore(() => getFirestore()),
        provideDatabase(() => getDatabase()),
        provideFunctions(() => getFunctions()),
        provideAuth(() => getAuth()),
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
