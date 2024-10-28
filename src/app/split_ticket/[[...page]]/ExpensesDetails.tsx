import React, { useState } from "react";
import Arrow from "@public/images/back-arrow.svg";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { IExpense } from "@/app/types/types";
import ExpenseDetails from "./ExpenseDetails";

const ExpensesDetails = ({ expenses }: { expenses: IExpense[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-6 3xl:space-y-10">
      <div className="flex space-x-10">
        <h1 className="text-2xl 2xl:text-3xl">All expenses</h1>
        <Image
          src={Arrow}
          alt={isOpen ? "Close" : "Open"}
          className={twMerge(
            "w-8 rotate-[-90deg] transition-transform",
            isOpen && " rotate-[90deg]"
          )}
          onClick={() => setIsOpen((curr) => !curr)}
        />
      </div>
      <div
        className={twMerge(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 transition-height",
          isOpen && "open pb-4"
        )}
      >
        {expenses.map((expense, index) => {
          return <ExpenseDetails expense={expense} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ExpensesDetails;
