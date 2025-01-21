import { useEffect, useState } from "react";

import { twMerge } from "tailwind-merge";
import { IExpense } from "@app/types/types";
import ExpenseDetails from "./ExpenseDetails";
import useResultContext from "@app/contexts/resultsContext";
import { useTranslations } from "next-intl";
import BackArrowIcon from "@/app/svgs/BackArrowIcon";

const ExpensesDetails = ({ expenses }: { expenses: IExpense[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { highlightedExpense } = useResultContext();

  const t = useTranslations();

  useEffect(() => {
    if (highlightedExpense) {
      setIsOpen(true);
    }
  }, [highlightedExpense]);

  return (
    <div className="flex flex-col space-y-6 3xl:space-y-10">
      <div
        className="flex space-x-10 cursor-pointer w-full justify-between lg:justify-start"
        onClick={() => setIsOpen((curr) => !curr)}
      >
        <h1 className="text-2xl 2xl:text-3xl">{t("results.allExpenses")}</h1>
        <BackArrowIcon
          className={twMerge(
            "w-8 h-8 rotate-[-90deg] transition-transform",
            isOpen && " rotate-[90deg]"
          )}
        />
      </div>
      <div
        className={twMerge(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 transition-height",
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
