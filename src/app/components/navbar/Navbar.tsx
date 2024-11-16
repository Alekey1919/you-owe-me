"use client";

import { twMerge } from "tailwind-merge";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import NavbarList from "./NavbarList";
import "@/css/burger.css";
import Burger from "./Burger";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, handleSignIn, handleSignOut } = useAuth();

  return (
    <div
      className={twMerge(
        "absolute left-0 right-0 top-0 bg-orange-300 z-[100] px-10 py-3  flex lg:justify-end",
        isLoading && "hidden"
      )}
    >
      <NavbarList
        isOpen={isOpen}
        signIn={handleSignIn}
        signOut={handleSignOut}
      />

      <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;
