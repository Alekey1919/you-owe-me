import { useCallback, useEffect, useState } from "react";
import useListAnimations from "../hooks/useListAnimations";
import useCalculationContext from "../contexts/calculationContext";
import Expense from "./Expense";
import useExpensesContext from "../contexts/expensesContext";

const ExpensesList = () => {
  const { isTouch } = useCalculationContext();
  const { expenses, setExpenses, setEditingIndex } = useExpensesContext();

  const [focusedExpense, setFocusedExpense] = useState<number | null>(null);

  const deleteExpense = (index: number) => {
    setExpenses((curr) => {
      const _curr = [...curr];

      _curr.splice(index, 1);

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
