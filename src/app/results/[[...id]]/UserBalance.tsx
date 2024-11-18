import { ReactNode, useEffect, useState } from "react";
import { IUserBalance, IUserBalanceAmountsDetails } from "../../types/types";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Arrow from "@public/images/back-arrow.svg";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "@app/hooks/useMediaQueryState";
import useResultContext from "@app/contexts/resultsContext";
import { useTranslations } from "next-intl";

const DetailsSection = ({
  text,
  totalAmount,
  expenses,
  isInFavor,
}: {
  text: ReactNode;
  totalAmount: number;
  expenses: IUserBalanceAmountsDetails[];
  isInFavor?: boolean;
}) => {
  const { highlightExpense } = useResultContext();

  return (
    <div className="card-section">
      <span className="underline">
        {text}{" "}
        <span
          className={twMerge(
            "underline",
            isInFavor ? "text-green-400" : "text-red-400"
          )}
        >
          ${Math.round(totalAmount)}
        </span>
      </span>
      <div
        className={twMerge(
          "flex flex-col space-y-2 ",
          !expenses.length && "hidden"
        )}
      >
        {expenses.map((expense, index) => {
          return (
            <span
              key={index}
              onClick={() => highlightExpense(expense.productName)}
            >
              {expense.productName}:{" "}
              <span
                className={twMerge(
                  isInFavor ? "text-green-400" : "text-red-400"
                )}
              >
                ${Math.round(expense.amount)}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

const UserBalance = ({
  userName,
  userBalance,
}: {
  userName: string;
  userBalance: IUserBalance;
}) => {
  const smScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.sm });
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations();

  const owesMoney = userBalance.balance < 0;

  useEffect(() => {
    setIsOpen(smScreen);
  }, [smScreen]);

  return (
    <div className={twMerge("card relative ", isOpen && "!pb-16")}>
      <div
        className="flex justify-between"
        onClick={() => !smScreen && setIsOpen((curr) => !curr)}
      >
        <span className="text-lg font-medium pl-2">{userName}</span>
        <Image
          src={Arrow}
          alt={t(`common.${isOpen ? "close" : "open"}`)}
          className={twMerge(
            "w-6 transition-transform sm:hidden",
            isOpen ? "rotate-90" : "rotate-[-90deg]"
          )}
        />
      </div>

      <div
        className={twMerge(
          "transition-height !transition-all !duration-300",
          isOpen && "open mt-2"
        )}
      >
        <div className="flex flex-col space-y-2">
          <DetailsSection
            text={`${t("results.totalToPay")}:`}
            totalAmount={userBalance.amountToPay.total}
            expenses={userBalance.amountToPay.details}
          />
          <DetailsSection
            text={`${t("results.totalPayed")}:`}
            totalAmount={userBalance.amountPayed.total}
            expenses={userBalance.amountPayed.details}
            isInFavor
          />
        </div>
      </div>
      <span
        className={twMerge(
          "pl-2 text-base 2xl:text-lg absolute bottom-4 opacity-0 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none"
        )}
      >
        {t("results.balance")}:{" "}
        <span
          className={twMerge(owesMoney ? "text-red-400" : "text-green-400")}
        >
          {/* If balance is negative e.g -1000 we remove the minus sign and add it manually before the $ sign  */}
          {owesMoney
            ? `-$${Math.round(userBalance.balance).toString().substring(1)}`
            : `$${Math.round(userBalance.balance)}`}
        </span>
      </span>
    </div>
  );
};

export default UserBalance;
