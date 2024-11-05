"use client";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/app/services/firebase/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Update the user state
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

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user or null if logged out
      setIsLoading(false); // Stop loading once we have the auth state
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div
      className={twMerge(
        "absolute left-0 right-0 top-0 bg-orange-300 z-[100]",
        isLoading && "hidden"
      )}
    >
      <ul className="flex w-full justify-end space-x-10 px-10 py-3 text-base">
        {user && (
          <Link href="/my_tickets">
            <li>My tickets</li>
          </Link>
        )}

        <li className="" onClick={user ? handleSignOut : handleSignIn}>
          {user ? "Logout" : "Login"}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
