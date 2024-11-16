import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "@app/services/firebase/firebase";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { addUser, removeUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      await saveUserToFirestore(result.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const saveUserToFirestore = async (user: User) => {
    const userRef = doc(db, "users", user.uid); // Reference to the user's document
    const userData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastLogin: new Date(),
    };

    try {
      await setDoc(userRef, userData, { merge: true }); // Merge to avoid overwriting
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
    }
  };

  // Listen to authentication state changes
  useEffect(() => {
    const stateListener = onAuthStateChanged(auth, (user) => {
      setIsLoading(false); // Stop loading once we have the auth state

      // Saving user in redux
      if (user) {
        dispatch(
          addUser({
            id: user.uid,
            name: user.displayName || "",
            photoURL: user.photoURL || "",
            email: user.email || "",
          })
        );
      }
    });

    return () => stateListener();
  }, [dispatch]);

  return { isLoading, handleSignOut, handleSignIn };
};

export default useAuth;
