import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBH4fHeMgD8yY7s6uF3OwWwBEXqlIrPwjQ",
  authDomain: "thelab-d1229.firebaseapp.com",
  projectId: "thelab-d1229",
  storageBucket: "thelab-d1229.appspot.com",
  appId: "1:334167578954:web:a87c19aee3a4d8f31ac9b3",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
