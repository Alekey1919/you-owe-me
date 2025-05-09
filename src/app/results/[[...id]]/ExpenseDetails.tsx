import useResultContext from "@app/contexts/resultsContext";
import { IExpense } from "@app/types/types";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

const ExpenseDetails = ({ expense }: { expense: IExpense }) => {
  // If the ticket was payed by a single person or not
  const isPaymentShared = Object.keys(expense.payedAmounts).length > 1;

  const { highlightedExpense, participants } = useResultContext();

  const t = useTranslations();

  const isHighlighted = useMemo(() => {
    return highlightedExpense === expense.name;
  }, [expense.name, highlightedExpense]);

  return (
    <div
      className={twMerge("card", isHighlighted && "highlighted")}
      id={expense.name}
    >
      <span className="pl-3">
        {expense.name} ~ ${expense.price.toLocaleString("de-DE")}{" "}
        {expense.consumers.length > 1 && (
          <span className="block">{`($${Math.round(
            expense.price / expense.consumers.length
          ).toLocaleString("de-DE")} c/u)`}</span>
        )}
      </span>
      <div className="card-section">
        <span className="underline">{t("common.consumers")}:</span>

        <span>
          {participants.length === expense.consumers.length
            ? `${t("common.everyone")} (${participants.length})`
            : expense.consumers.join(", ")}
        </span>
      </div>

      <div className="flex flex-col space-y-2 border-background border-solid border-[2px] p-2 rounded-xl text-base 2xl:text-lg mt-3">
        <span className="underline">{t("results.payedBy")}:</span>
        {Object.keys(expense.payedAmounts).map((payer, index) => {
          // If the expense was payed by multiple people it shows how much each person payed
          if (!isPaymentShared) {
            return <span key={index}>{payer}</span>;
          }

          return (
            <span key={index}>
              {payer}
              {isPaymentShared &&
                `: $${expense.payedAmounts[payer].toLocaleString("de-DE")}`}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseDetails;
