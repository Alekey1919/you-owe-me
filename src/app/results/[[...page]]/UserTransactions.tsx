import React from "react";
import { ITransaction } from "../../types/types";

const UserTransactions = ({
  transactions,
}: {
  transactions: ITransaction[];
}) => {
  return (
    <div className="box">
      <span className="font-medium">{transactions[0].payer} paga:</span>
      <div className="flex flex-col space-y-2">
        {transactions.map((transaction, index) => {
          return (
            <span key={index}>
              ${Math.round(transaction.amount)} a {transaction.payee}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default UserTransactions;
