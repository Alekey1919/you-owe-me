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
    <>
      <nav
        className={twMerge(
          "fixed left-0 right-0 top-0 z-[100] px-10 py-3 flex lg:justify-end mix-blend-difference",
          isLoading && "hidden"
        )}
      >
        <NavbarList
          isOpen={isOpen}
          signIn={handleSignIn}
          signOut={handleSignOut}
        />

        <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>

      {/* There's a bug when using mix-blend with backdrop-filter blur so the blur is applied on a different element */}
      <div
        className="fixed w-screen top-0 left-0 h-[250px] z-[5] pointer-events-none lg:hidden"
        style={{
          backdropFilter: isOpen ? "blur(10px)" : "",
        }}
      />
    </>
  );
};

export default Navbar;
