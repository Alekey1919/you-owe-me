import { ReactNode } from "react";
import { IUserBalance, IUserBalanceAmountsDetails } from "../types/types";
import { twMerge } from "tailwind-merge";

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
    <div className="flex flex-col space-y-2 border-background border-solid border-[2px] p-2 rounded-xl">
      <span>
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
  const owesMoney = userBalance.balance < 0;

  return (
    <div className="box flex flex-col space-y-2">
      <span className="text-lg font-medium pl-2">{userName}</span>

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

      <span className="pl-2">
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
