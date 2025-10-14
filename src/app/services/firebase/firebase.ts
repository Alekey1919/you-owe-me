import { setCookie } from "@/app/utils/cookies";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };

export default app;

auth.onAuthStateChanged(async (user) => {
  if (typeof window === "undefined") return;

  if (user) {
    const token = await user.getIdToken();
    setCookie("auth_token", token);
    // Set the token in a cookie
  } else {
    // Clear the cookie if not logged in
    document.cookie = "auth_token=; Path=/; Max-Age=0;";
  }
});
