import { ReactNode, useEffect, useState } from "react";
import { IUserBalance, IUserBalanceAmountsDetails } from "../../types/types";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Arrow from "@public/images/back-arrow.svg";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "@/app/hooks/useMediaQueryState";

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
  return (
    <div className="flex flex-col space-y-2 border-background border-solid border-[2px] p-2 rounded-xl text-base 2xl:text-lg">
      <span className="underline">
        {text}{" "}
        <span
          className={twMerge(
            "underline",
            isInFavor ? "text-green-400" : "text-red-400"
          )}
        >
          ${totalAmount}
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
            <span key={index}>
              {expense.productName}:{" "}
              <span
                className={twMerge(
                  isInFavor ? "text-green-400" : "text-red-400"
                )}
              >
                ${expense.amount}
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

  const owesMoney = userBalance.balance < 0;

  useEffect(() => {
    setIsOpen(smScreen);
  }, [smScreen]);

  return (
    <div className={twMerge("box flex flex-col relative ", isOpen && "!pb-16")}>
      <div className="flex justify-between">
        <span className="text-lg font-medium pl-2">{userName}</span>
        <Image
          src={Arrow}
          alt={isOpen ? "Close" : "Open"}
          className={twMerge(
            "w-6 transition-transform ",
            isOpen ? "rotate-90" : "rotate-[-90deg]"
          )}
          onClick={() => setIsOpen((curr) => !curr)}
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
            text="Total amount to pay:"
            totalAmount={userBalance.amountToPay.total}
            expenses={userBalance.amountToPay.details}
          />
          <DetailsSection
            text="Total amount payed:"
            totalAmount={userBalance.amountPayed.total}
            expenses={userBalance.amountPayed.details}
            isInFavor
          />
        </div>
      </div>
      <span
        className={twMerge(
          "pl-2 text-base 2xl:text-lg absolute bottom-4 opacity-0 transition-opacity",
          isOpen && "opacity-100"
        )}
      >
        Balance:{" "}
        <span
          className={twMerge(owesMoney ? "text-red-400" : "text-green-400")}
        >
          {/* If balance is negative e.g -1000 we remove the minus sign and add it manually before the $ sign  */}
          {owesMoney
            ? `-$${userBalance.balance.toString().substring(1)}`
            : `$${userBalance.balance}`}
        </span>
      </span>
    </div>
  );
};

export default UserBalance;
