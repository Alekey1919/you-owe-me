"use client";

import { twMerge } from "tailwind-merge";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import NavbarList from "./NavbarList";
import "@/css/burger.css";
import Burger from "./Burger";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, handleSignIn, handleSignOut } = useAuth();

  const pathname = usePathname();

  // Close mobile navbar when clicking on a link
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={twMerge(
          "fixed left-0 right-0 top-0 z-[100] px-10 py-3 flex lg:justify-end transition-colors duration-300",
          isLoading && "hidden",
          isOpen ? "bg-background" : "mix-blend-difference"
        )}
      >
        <NavbarList
          isOpen={isOpen}
          signIn={handleSignIn}
          signOut={handleSignOut}
        />

        <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
    </>
  );
};

export default Navbar;
