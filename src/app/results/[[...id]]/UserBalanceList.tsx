import { IUserBalances } from "@/app/types/types";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import UserBalance from "./UserBalance";
import Arrow from "@public/images/back-arrow.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const UserBalanceList = ({ userBalances }: { userBalances: IUserBalances }) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations();

  return (
    <div className="flex flex-col space-y-6 3xl:space-y-10">
      <div
        className="flex space-x-10 cursor-pointer"
        onClick={() => setIsOpen((curr) => !curr)}
      >
        <h1 className="text-2xl 2xl:text-3xl">
          {t("results.expensesPerPerson")}
        </h1>
        <Image
          src={Arrow}
          alt={t(`common.${isOpen ? "close" : "open"}`)}
          className={twMerge(
            "w-8 rotate-[-90deg] transition-transform",
            isOpen && " rotate-[90deg]"
          )}
        />
      </div>
      <div
        className={twMerge(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 transition-height",
          isOpen && "open pb-4"
        )}
      >
        {Object.keys(userBalances).map((participant, index) => {
          return (
            <UserBalance
              userName={participant}
              userBalance={userBalances[participant]}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserBalanceList;
