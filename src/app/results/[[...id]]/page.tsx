"use client";

import { useMemo, useState } from "react";
import useSplitTicket from "../../hooks/useSplitTicket";
import { ITransaction } from "../../types/types";
import UserTransactions from "./UserTransactions";
import UserBalanceList from "./UserBalanceList";
import ExpensesDetails from "./ExpensesDetails";
import { ResultContextProvider } from "@app/contexts/resultsContext";
import { smoothScrollTo } from "@app/utils/smoothScrollTo";
import ErrorMessage from "./ErrorMessage";
import { useTranslations } from "next-intl";
import Spinner from "@/app/svgs/Spinner";
import EditIcon from "@/app/svgs/EditIcon";
import { RoutesEnum } from "@/app/enums/routes";
import { useRouter } from "next/navigation";

const Results = ({ isTesting }: { isTesting?: boolean }) => {
  const [highlightedExpense, setHighlightedExpense] = useState("");
  const {
    userBalances,
    transactions,
    expenses,
    participants,
    error,
    isLoading,
  } = useSplitTicket(isTesting);

  const router = useRouter();
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
          <EditIcon
            className="absolute top-6 lg:top-9 right-8 lg:right-[unset] lg:left-10 w-6 h-6 z-[300]"
            color="var(--accent)"
            onClick={() => router.push(`${RoutesEnum.Ticket}/local`)}
          />

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
