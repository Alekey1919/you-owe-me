"use client";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "@app/services/firebase/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { doc, setDoc } from "firebase/firestore";
import { addUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { RoutesEnum } from "../enums/routes";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Update the user state

      await saveUserToFirestore(result.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
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
      setUser(user); // Set the user or null if logged out
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

  return (
    <div
      className={twMerge(
        "absolute left-0 right-0 top-0 bg-orange-300 z-[100] px-10 py-3",
        isLoading && "hidden"
      )}
    >
      <div className="w-full flex justify-between">
        <LanguageSwitcher />
        <ul className="flex w-full justify-end space-x-10 text-base">
          {user && (
            <Link href="/my_tickets">
              <li>My tickets</li>
            </Link>
          )}

          <Link href={RoutesEnum.Ticket}>
            <li className="cursor-pointer">New ticket</li>
          </Link>

          <li
            className="cursor-pointer"
            onClick={user ? handleSignOut : handleSignIn}
          >
            {user ? "Logout" : "Login"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
