import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANsSZBXXlfmTWxuG3T7oEX8HxGY59yMZI",
  authDomain: "manage-users-tech-test-backend.firebaseapp.com",
  projectId: "manage-users-tech-test-backend",
  storageBucket: "manage-users-tech-test-backend.appspot.com",
  messagingSenderId: "838167386676",
  appId: "1:838167386676:web:de5a1cd9d728c366bdc861",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const user = onRequest({ cors: true }, (request, response) => {
  if (request.method !== "DELETE") {
    response.status(405);
    response.send("Method not allowed");
    return;
  }

  if (!request.body.id) {
    response.status(400);
    response.send("Bad request");
    return;
  }

  logger.info("Deleting!", request.body.id);
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  db;

  response.status(200);
  response.send("Hello from Firebase!!");
});
