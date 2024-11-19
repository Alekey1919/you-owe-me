import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { RoutesEnum } from "../../enums/routes";
import LanguageSwitcher from "./LanguageSwitcher";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/redux/slices/userSlice";
import { twMerge } from "tailwind-merge";
import LightBulbIcon from "@/app/svgs/LightBulbIcon";
import useColorTheme from "@/app/hooks/useColorTheme";
import { selectTheme } from "@/app/redux/slices/themeSlice";
import { ColorThemesEnum } from "@/app/utils/autoDetectColorPreference";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "@/app/hooks/useMediaQueryState";
import useNavbarContext from "@/app/contexts/navbarContext";

const NavbarList = () => {
  const { isMobileOpen, handleSignIn, handleSignOut } = useNavbarContext();
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });

  const t = useTranslations();

  const { switchColorTheme } = useColorTheme();

  return (
    <div
      className={twMerge(
        "fixed lg:relative w-screen left-0 top-16 lg:top-0 pb-4 lg:pb-0 lg:pt-6 pointer-events-none lg:pointer-events-auto lg:pr-6",
        "bg-background lg:bg-transparent ease-out duration-500 opacity-0 lg:opacity-100 transition-all z-10",
        isMobileOpen && "opacity-100 pointer-events-auto"
      )}
    >
      <ul
        className={twMerge(
          "flex flex-col lg:flex-row w-full justify-end space-y-4 lg:space-y-0 lg:space-x-10 text-base xl:text-lg 3xl:text-xl pl-10 lg:pl-0",
          theme === ColorThemesEnum.Light && lgScreen
            ? "text-background"
            : "text-accent"
        )}
      >
        {user && (
          <Link href="/my_tickets">
            <li>{t("myTickets.title")}</li>
          </Link>
        )}

        <Link href={RoutesEnum.Ticket}>
          <li className="cursor-pointer">{t("navbar.newTicket")}</li>
        </Link>

        <li
          className="cursor-pointer"
          onClick={user ? handleSignOut : handleSignIn}
        >
          {t(`navbar.${user ? "logout" : "login"}`)}
        </li>
        <li>
          <LanguageSwitcher />
        </li>
        <li>
          <LightBulbIcon className="w-6 h-6" onClick={switchColorTheme} />
        </li>
      </ul>
    </div>
  );
};

export default NavbarList;
