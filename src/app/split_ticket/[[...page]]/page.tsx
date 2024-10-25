"use client";

import { useMemo } from "react";
import useSplitTicket from "../../hooks/useSplitTicket";
import UserBalance from "./UserBalance";
import { ITransaction } from "../../types/types";
import UserTransactions from "./UserTransactions";

const Results = () => {
  const { userBalances, transactions } = useSplitTicket();

  const groupedTransactions = useMemo(() => {
    const grouped: { [key: string]: ITransaction[] } = {};

    transactions.map((transaction) => {
      if (grouped[transaction.payer]) {
        grouped[transaction.payer].push(transaction);
      } else {
        grouped[transaction.payer] = [transaction];
      }
    });

    return grouped;
  }, [transactions]);

  return (
    <div className="min-h-screen min-w-[100vh] flex flex-col items-center space-y-20 pt-20">
      <div className="flex flex-col w-full justify-center space-y-20">
        <div className="flex flex-col space-y-10">
          <h1 className="text-2xl">Expenses per user</h1>
          <div className="grid grid-cols-4 px-10 gap-4">
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
        <div className="flex flex-col space-y-10">
          <h1 className="text-2xl">Transactions</h1>

          <div className="flex space-x-4">
            {Object.keys(groupedTransactions).map((payer, index) => {
              return (
                <UserTransactions
                  transactions={groupedTransactions[payer]}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
