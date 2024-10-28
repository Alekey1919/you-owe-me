"use client";

import { useMemo } from "react";
import useSplitTicket from "../../hooks/useSplitTicket";
import { ITransaction } from "../../types/types";
import UserTransactions from "./UserTransactions";
import UserBalanceList from "./UserBalanceList";
import ExpensesDetails from "./ExpensesDetails";

const Results = () => {
  const { userBalances, transactions, expenses } = useSplitTicket();

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
    <div className="w-full flex flex-col items-center space-y-20 py-8 3xl:py-14 px-8 3xl:px-10">
      <div className="flex flex-col w-full justify-center ">
        <ExpensesDetails expenses={expenses} />
        <UserBalanceList userBalances={userBalances} />

        <div className="flex flex-col space-y-6 3xl:space-y-10">
          <h1 className="text-2xl 2xl:text-3xl">Transacciones</h1>

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
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
