import { useEffect, useMemo, useState } from "react";
import ExpensesList from "./ExpensesList";
import useCalculationContext from "@app/contexts/calculationContext";
import { twMerge } from "tailwind-merge";
import Button from "@app/components/Button";
import NewExpenseModal from "./NewExpenseModal";
import { ExpensesContextProvider } from "@app/contexts/expensesContext";
import { EXPENSES } from "@root/mockedData";

const Expenses = () => {
  const [expenses, setExpenses] = useState(EXPENSES);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { lgScreen, isLeftSelected } = useCalculationContext();

  const isSelectedInMobile = useMemo(() => {
    if (lgScreen) return;

    return !isLeftSelected;
  }, [isLeftSelected, lgScreen]);

  useEffect(() => {
    if (editingIndex !== null) {
      setShowModal(true);
    }
  }, [editingIndex]);

  return (
    <ExpensesContextProvider
      state={{
        showModal,
        setShowModal,
        expenses,
        setExpenses,
        editingIndex,
        setEditingIndex,
      }}
    >
      <div
        className={twMerge(
          "flex flex-col lg:space-y-8 min-w-[260px] w-full shrink-0 lg:w-[unset] transition-transform duration-300 pl-[1px]",
          isSelectedInMobile && "-translate-x-full"
        )}
      >
        <span className="subtitle text-center hidden lg:block">Expenses:</span>
        <div className="flex flex-col space-y-2">
          <Button text="Add expense" onClick={() => setShowModal(true)} />
          <NewExpenseModal showModal={showModal} setShowModal={setShowModal} />
          <ExpensesList />
        </div>
      </div>
    </ExpensesContextProvider>
  );
};

export default Expenses;
