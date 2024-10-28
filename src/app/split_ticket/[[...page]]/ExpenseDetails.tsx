import { IExpense } from "@/app/types/types";
import React from "react";

const ExpenseDetails = ({ expense }: { expense: IExpense }) => {
  // If the ticket was payed by a single person or not
  const isPaymentShared = Object.keys(expense.payedAmounts).length > 1;

  return (
    <div className="box flex flex-col text-base 2xl:text-lg">
      <span className="pl-3">
        {expense.name} ~ ${expense.price}{" "}
        {expense.consumers.length > 1 && (
          <span className="block">{`($${Math.round(
            expense.price / expense.consumers.length
          )} c/u)`}</span>
        )}
      </span>
      <div className="flex flex-col space-y-2 border-background border-solid border-[2px] p-2 rounded-xl text-base 2xl:text-lg mt-3">
        <span className="underline">Consumidores:</span>
        {/* // TODO: Add "Everyone" when all consumers are present */}
        <span>{expense.consumers.join(", ")}</span>
      </div>

      <div className="flex flex-col space-y-2 border-background border-solid border-[2px] p-2 rounded-xl text-base 2xl:text-lg mt-3">
        <span className="underline">Pagado por:</span>
        {Object.keys(expense.payedAmounts).map((payer, index) => {
          if (!isPaymentShared) {
            return <span key={index}>{payer}</span>;
          }

          return (
            <span key={index}>
              {payer}
              {isPaymentShared && `: $${expense.payedAmounts[payer]}`}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseDetails;
