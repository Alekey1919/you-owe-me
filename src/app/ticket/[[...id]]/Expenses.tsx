import Button from "@app/components/Button";
import useCalculationContext from "@app/contexts/calculationContext";
import { ExpensesContextProvider } from "@app/contexts/expensesContext";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import ExpensesList from "./ExpensesList";
import NewExpenseModal from "./NewExpenseModal";

const Expenses = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const {
    lgScreen,
    isParticipantsSelected,
    ticketData: { participants },
  } = useCalculationContext();
  const t = useTranslations();

  const isSelectedInMobile = useMemo(() => {
    if (lgScreen) return;

    return !isParticipantsSelected;
  }, [isParticipantsSelected, lgScreen]);

  useEffect(() => {
    if (editingIndex !== null) {
      setShowModal(true);
    }
  }, [editingIndex]);

  const handleOpen = () => {
    if (participants.length === 0) {
      return toast.error(t("ticket.addAtLeastOneParticipant"));
    }

    setShowModal(true);
  };

  return (
    <ExpensesContextProvider
      state={{
        showModal,
        setShowModal,
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
        {/* TODO: Add placeholder to calculate boxHeight in animations hook  */}
        <span className="subtitle text-center hidden lg:block">
          {t("common.expenses")}:
        </span>
        <div className="flex flex-col space-y-2">
          <Button text={t("ticket.addExpense")} onClick={handleOpen} />
          <NewExpenseModal showModal={showModal} setShowModal={setShowModal} />
          <ExpensesList />
        </div>
      </div>
    </ExpensesContextProvider>
  );
};

export default Expenses;
