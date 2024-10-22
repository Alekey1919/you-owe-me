import { useMemo, useState } from "react";
import ExpensesList from "./ExpensesList";
import useCalculationContext from "./CalculationContext";
import { twMerge } from "tailwind-merge";
import Button from "../components/Button";
import NewExpenseModal from "./NewExpenseModal";

const Expenses = () => {
  const [showModal, setShowModal] = useState(false);

  const { lgScreen, isLeftSelected } = useCalculationContext();

  const isSelectedInMobile = useMemo(() => {
    if (lgScreen) return;

    return !isLeftSelected;
  }, [isLeftSelected, lgScreen]);

  return (
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
  );
};

export default Expenses;
