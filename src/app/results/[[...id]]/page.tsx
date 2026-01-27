"use client";

import Spinner from "@/app/svgs/Spinner";
import { ResultContextProvider } from "@app/contexts/resultsContext";
import { smoothScrollTo } from "@app/utils/smoothScrollTo";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import useSplitTicket from "../../hooks/useSplitTicket";
import { ITransaction } from "../../types/types";
import EditTicket from "./EditTicket";
import ErrorMessage from "./ErrorMessage";
import ExpensesDetails from "./ExpensesDetails";
import TicketInfo from "./TicketInfo";
import UserBalanceList from "./UserBalanceList";
import UserTransactions from "./UserTransactions";

const Results = ({ isTesting }: { isTesting?: boolean }) => {
  const [highlightedExpense, setHighlightedExpense] = useState("");
  const {
    ticketData,
    userBalances,
    transactions,
    expenses,
    participants,
    error,
    isLoading,
  } = useSplitTicket(isTesting);

  const t = useTranslations("results");

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

  const highlightExpense = (expenseName: string) => {
    setHighlightedExpense(expenseName);

    const expenseNode = document.getElementById(expenseName);

    if (expenseNode) {
      smoothScrollTo(expenseNode);
    }

    setTimeout(() => {
      setHighlightedExpense("");
    }, 3000);
  };

  if (error !== null) {
    return <ErrorMessage error={error} />;
  }

  if (isLoading) {
    return (
      <div className="absolute-full flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  return (
    <ResultContextProvider
      state={{ highlightedExpense, highlightExpense, participants }}
    >
      <div className="w-full flex flex-col items-center space-y-20 layout">
        <div className="flex flex-col w-full justify-center ">
          {ticketData && (
            <div className="flex space-x-4 absolute top-6 lg:top-9 right-8 lg:right-[unset] lg:left-10 z-[100]">
              <TicketInfo {...ticketData} />
              <EditTicket
                ticketId={ticketData?.id}
                ticketOwner={ticketData?.userId}
              />
            </div>
          )}
          <span className="title text-center my-4">{ticketData?.name}</span>

          <ExpensesDetails expenses={expenses} />
          <UserBalanceList userBalances={userBalances} />

          <div className="flex flex-col space-y-6 3xl:space-y-10">
            <h1 className="text-2xl 2xl:text-3xl">{t("transactions")}</h1>

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
    </ResultContextProvider>
  );
};

export default Results;
