import useListAnimations from "../hooks/useListAnimations";
import useCalculationContext from "./CalculationContext";
import Expense from "./Expense";

const ExpensesList = () => {
  const { expenses, setExpenses } = useCalculationContext();

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
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ExpensesList;
