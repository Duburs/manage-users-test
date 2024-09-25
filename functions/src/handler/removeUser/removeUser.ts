import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase/app";

import { getFirestore, collection, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANsSZBXXlfmTWxuG3T7oEX8HxGY59yMZI",
  authDomain: "manage-users-tech-test-backend.firebaseapp.com",
  projectId: "manage-users-tech-test-backend",
  storageBucket: "manage-users-tech-test-backend.appspot.com",
  messagingSenderId: "838167386676",
  appId: "1:838167386676:web:de5a1cd9d728c366bdc861",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userCollection = collection(db, "users");

export const removeUser = onRequest(
  { cors: true },
  async (request, response) => {
    // This should probably only be the app url
    response.set("Access-Control-Origin", "*");

    // logger.info("Request:", request.body);

    // Check if the request has an authorization header,
    // normally we'd verify and decode the token and check if the user is allowed to perform the action
    // but I only have logged in / out state
    if (!request.headers.authorization) {
      response.status(401);
      response.send("Unauthorized");
      return;
    }

    const id = request.body.data.id;

    if (!id) {
      response.status(400);
      response.send("Bad request");
      return;
    }

    logger.info("Deleting:", id);

    const res = await deleteDoc(doc(userCollection, id));
    logger.info("Deleted:", id, res);

    response.status(200).json({ data: {} });
  }
);
