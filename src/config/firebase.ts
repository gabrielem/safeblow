import { FirebaseConfig } from '@/modules/_types'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, updateProfile, User } from 'firebase/auth'

import { getDatabase, ref, set, get } from 'firebase/database';
import { getStorage } from "firebase/storage"

const FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
}

const firebaseApp = !getApps().length ? initializeApp(FIREBASE_CONFIG) : getApps()[0]
export const app = firebaseApp
export const db = getDatabase(app);
export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)


export const dbGet = async (path: string) => {
  // const data = ref(db, path); 
  const dataSnapshot = await get(ref(db, path));
  return dataSnapshot?.val();
}

export const dbSet = async (path: string, value: any) => {
  await set(ref(db, path), value);
}

// export const updateUserDisplayName = async (user: User, displayName: string) => {
export const updateUserDisplayName = async (displayName: string) => {
  const currentUser = auth.currentUser as User
  if (!currentUser) {
    console.error("Not authenticated");
    return false;
  }
  try {
    await updateProfile(currentUser, { displayName });
    return true;
  } catch (error) {
    console.error("Error updating display name:", error);
    return false;
  }
}