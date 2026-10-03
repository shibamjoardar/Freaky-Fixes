// Firebase project connection.
// These are safe to be public in client code — Firebase security comes from firestore.rules, not from hiding this file.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUOrVQHGAYJg926v0QXp0MIocssUIdjv4",
  authDomain: "freaky-fixes.firebaseapp.com",
  projectId: "freaky-fixes",
  storageBucket: "freaky-fixes.firebasestorage.app",
  messagingSenderId: "1064640614066",
  appId: "1:1064640614066:web:0f44c7f7454997b66283ab"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();