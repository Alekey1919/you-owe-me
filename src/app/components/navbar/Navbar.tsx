"use client";

import { twMerge } from "tailwind-merge";
import useAuth from "../../hooks/useAuth";
import { useEffect, useMemo, useState } from "react";
import NavbarList from "./NavbarList";
import "@/css/burger.css";
import Burger from "./Burger";
import { usePathname } from "next/navigation";
import { NavbarContextProvider } from "@/app/contexts/navbarContext";
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/redux/slices/themeSlice";
import { ColorThemesEnum } from "@/app/utils/autoDetectColorPreference";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isLoading, handleSignIn, handleSignOut } = useAuth();

  const theme = useSelector(selectTheme);

  // Due to some issues with the mix-blend-difference property not working correctly when the background is white, the svg needs to be the same color as the background for the effect to apply.
  // When the navbar is open we set to the accent since we have a solid background
  const svgColor = useMemo(() => {
    return theme === ColorThemesEnum.Light && !isMobileOpen
      ? "var(--background)"
      : "var(--accent)";
  }, [isMobileOpen, theme]);

  const pathname = usePathname();

  // Close mobile navbar when clicking on a link
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <NavbarContextProvider
      state={{
        isMobileOpen,
        setIsMobileOpen,
        handleSignIn,
        handleSignOut,
        svgColor,
      }}
    >
      <nav
        className={twMerge(
          "fixed left-0 right-0 top-0 z-[100] px-10 py-3 flex lg:justify-end transition-colors duration-300 ",
          isLoading && "hidden",
          isMobileOpen ? "bg-background" : "mix-blend-difference"
        )}
      >
        <NavbarList />

        <Burger />
      </nav>
    </NavbarContextProvider>
  );
};

export default Navbar;
