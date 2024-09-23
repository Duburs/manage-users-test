import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { AuthService } from './services/auth.service';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: AuthService },
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
};
