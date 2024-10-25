import { useCallback, useEffect, useState } from "react";
import useListAnimations from "@app/hooks/useListAnimations";
import useCalculationContext from "@app/contexts/calculationContext";
import Expense from "./Expense";
import useExpensesContext from "@app/contexts/expensesContext";
import { ITicket } from "@/app/types/types";

const ExpensesList = () => {
  const { isTouch } = useCalculationContext();
  const { setEditingIndex } = useExpensesContext();
  const {
    ticketData: { expenses },
    setTicketData,
  } = useCalculationContext();

  const [focusedExpense, setFocusedExpense] = useState<number | null>(null);

  const deleteExpense = (index: number) => {
    setTicketData((curr) => {
      const _curr: ITicket = JSON.parse(JSON.stringify(curr));

      _curr.expenses.splice(index, 1);

      return _curr;
    });
  };

  const { getBoxAnimationStyles, handleRemoveAnimation, performingAnimation } =
    useListAnimations({
      removeListItem: deleteExpense,
      boxClassName: "participant",
    });

  const handleTouch = useCallback(
    (e?: any, index?: number) => {
      if (!isTouch) return;

      if (!e || !e.target.className.includes("expense")) {
        setFocusedExpense(null);
      } else {
        setFocusedExpense(index || 0);
      }
    },
    [isTouch]
  );

  useEffect(() => {
    document.addEventListener("pointerdown", handleTouch);

    return () => document.removeEventListener("pointerdown", handleTouch);
  }, [handleTouch]);

  if (!expenses.length) return <></>;

  return (
    <div className="flex flex-col space-y-2 relative">
      {expenses.map((expense, index) => {
        return (
          <Expense
            expenseData={expense}
            deleteExpense={() => handleRemoveAnimation(index)}
            styles={getBoxAnimationStyles(index)}
            performingAnimation={performingAnimation}
            isFocusedTouch={focusedExpense === index}
            handleTouch={(e) => handleTouch(e, index)}
            handleEdit={() => setEditingIndex(index)}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ExpensesList;
