import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut, 
  onAuthStateChanged as firebaseOnAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error('Error logging in with Google:', error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error logging in with email:', error);
    throw error;
  }
};

export const signupWithEmail = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential;
  } catch (error) {
    console.error('Error signing up with email:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    return await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return firebaseOnAuthStateChanged(auth, callback);
};
