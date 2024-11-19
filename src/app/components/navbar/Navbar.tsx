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
import useMediaQueryState, {
  DefaultBreakpoints,
} from "@/app/hooks/useMediaQueryState";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileClosing, setIsMobileClosing] = useState(false);
  const { isLoading, handleSignIn, handleSignOut } = useAuth();

  const theme = useSelector(selectTheme);
  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });

  // Due to some issues with the mix-blend-difference property not working correctly when the background is white, the svg needs to be the same color as the background for the effect to apply.
  // When the navbar is open we set to the accent since we have a solid background
  const svgColor = useMemo(() => {
    return theme === ColorThemesEnum.Light && !isMobileOpen
      ? "var(--background)"
      : "var(--accent)";
  }, [isMobileOpen, theme]);

  const [showMixBlend, setShowMixBlend] = useState(true);

  // When closing the navbar in mobile, we wait for it to disappear before applying the mix-blend-mode to avoid color bugs
  useEffect(() => {
    if (isMobileOpen) {
      return setShowMixBlend(false);
    }

    if (!lgScreen && !isMobileOpen) {
      setIsMobileClosing(true);

      setTimeout(() => {
        setShowMixBlend(true);
        setIsMobileClosing(false);
      }, 500);
    }
  }, [isMobileOpen, lgScreen]);

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
        lgScreen,
      }}
    >
      <nav
        className={twMerge(
          "fixed left-0 right-0 top-0 z-[100] px-10 py-3 flex lg:justify-end transition-colors duration-300",
          isLoading && "hidden",
          isMobileOpen && "bg-background",
          showMixBlend && "mix-blend-difference"
        )}
      >
        <NavbarList />

        <Burger isMobileClosing={isMobileClosing} />
      </nav>
    </NavbarContextProvider>
  );
};

export default Navbar;
