import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "../services/firebase/firebase";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/slices/userSlice";
import { doc, setDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";

const useAuth = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const t = useTranslations("login");

  const handleError = (error: string) => {
    let emailError = "";
    let passwordError = "";

    if (error.includes("auth/invalid-email")) {
      emailError = t("useValidEmail");
    }

    if (error.includes("auth/email-already-in-use")) {
      emailError = t("emailInUse");
    }

    if (error.includes("auth/invalid-credential")) {
      passwordError = t("passwordOrEmailIncorrect");
    }

    setEmailError(emailError);
    setPasswordError(passwordError);
  };

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      handleError(error.message);
    }
  };

  const handleEmailRegistration = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      saveUserToFirestore(response.user);
    } catch (error: any) {
      handleError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
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
            email: user.email || "",
          })
        );

        // Redirecting back to the route where user clicked on "Login"
        const cameFrom = searchParams.get("from");

        if (cameFrom) {
          router.push(cameFrom);
        }
      }
    });

    return () => stateListener();
  }, [dispatch, router, searchParams]);

  return {
    handleEmailLogin,
    handleEmailRegistration,
    emailError,
    passwordError,
    isLoading,
    handleGoogleLogin,
    handleSignOut,
  };
};

export default useAuth;
