import useCalculationContext from "./CalculationContext";
import Expense from "./Expense";
import NewExpense from "./NewExpense";

const Expenses = () => {
  const { expenses, setExpenses } = useCalculationContext();

  const deleteExpense = (index: number) => {
    setExpenses((curr) => {
      const _curr = [...curr];

      _curr.splice(index, 1);

      return _curr;
    });
  };

  return (
    <div className="flex flex-col space-y-8 min-w-[260px]">
      <span className="font-medium text-xl">Expenses:</span>
      <div className="flex flex-col space-y-2">
        <NewExpense />
        <div className="flex flex-col space-y-3 relative">
          {expenses.map((expense, index) => {
            return (
              <Expense
                expenseData={expense}
                deleteExpense={() => deleteExpense(index)}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
