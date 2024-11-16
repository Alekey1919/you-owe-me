import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { RoutesEnum } from "../../enums/routes";
import LanguageSwitcher from "./LanguageSwitcher";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/redux/slices/userSlice";
import { twMerge } from "tailwind-merge";

const NavbarList = ({
  isOpen,
  signIn,
  signOut,
}: {
  isOpen: boolean;
  signIn: () => void;
  signOut: () => void;
}) => {
  const user = useSelector(selectUser);

  const t = useTranslations();

  return (
    <div
      className={twMerge(
        "fixed w-screen left-0 top-0 pt-16 lg:pt-6 pointer-events-none lg:pointer-events-auto lg:pr-6",
        "bg-transparent ease-out duration-500 opacity-0 lg:opacity-100 transition-all",
        isOpen && "opacity-100 pointer-events-auto"
      )}
      style={{ backdropFilter: isOpen ? "blur(10px)" : "" }}
    >
      <ul className="flex flex-col lg:flex-row w-full justify-end space-y-4 lg:space-y-0 lg:space-x-10 text-base xl:text-lg 3xl:text-xl pl-10 lg:pl-0">
        {user && (
          <Link href="/my_tickets">
            <li>{t("myTickets.title")}</li>
          </Link>
        )}

        <Link href={RoutesEnum.Ticket}>
          <li className="cursor-pointer">{t("navbar.newTicket")}</li>
        </Link>

        <li className="cursor-pointer" onClick={user ? signOut : signIn}>
          {t(`navbar.${user ? "logout" : "login"}`)}
        </li>
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </div>
  );
};

export default NavbarList;
