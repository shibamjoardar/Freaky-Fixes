import { auth, googleProvider, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, setDoc, serverTimestamp, collection, addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function signUpUser(name, email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await setDoc(doc(db, "users", cred.user.uid), {
    name, email, createdAt: serverTimestamp()
  });
  return cred.user;
}

export async function signInUser(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signInWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider);
  await setDoc(doc(db, "users", cred.user.uid), {
    name: cred.user.displayName,
    email: cred.user.email,
    createdAt: serverTimestamp()
  }, { merge: true });
  return cred.user;
}

export async function signOutUser() {
  await signOut(auth);
}

export function watchAuthState(callback) {
  onAuthStateChanged(auth, callback);
}

export async function submitContactMessage(name, email, message) {
  await addDoc(collection(db, "messages"), {
    name, email, message, createdAt: serverTimestamp()
  });
}

// Friendlier text for Firebase's raw error codes.
export function friendlyAuthError(error) {
  const map = {
    "auth/email-already-in-use": "That email is already registered. Try logging in instead.",
    "auth/invalid-email": "That doesn't look like a valid email address.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/popup-closed-by-user": "Google sign-in was closed before finishing."
  };
  return map[error.code] || "Something went wrong. Please try again.";
}
