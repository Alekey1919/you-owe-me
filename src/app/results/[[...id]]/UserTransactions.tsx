import React from "react";
import { ITransaction } from "../../types/types";
import { useTranslations } from "next-intl";

const UserTransactions = ({
  transactions,
}: {
  transactions: ITransaction[];
}) => {
  const t = useTranslations("results");

  return (
    <div className="box">
      <span className="font-medium">
        {transactions[0].payer} {t("pays")}:
      </span>
      <div className="flex flex-col space-y-2">
        {transactions.map((transaction, index) => {
          return (
            <span key={index}>
              ${Math.round(transaction.amount)} {t("to")} {transaction.payee}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default UserTransactions;
