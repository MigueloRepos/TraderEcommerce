import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "inspired-opus-lw2h4",
  appId: "1:738334799467:web:c3370dd1e2a99e35cb232e",
  apiKey: "AIzaSyDHmN7r3o1U7L8FyR0mg_EDPZK_EK4yCpQ",
  authDomain: "inspired-opus-lw2h4.firebaseapp.com",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);
