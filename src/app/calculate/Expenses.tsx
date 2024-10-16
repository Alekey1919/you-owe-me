import ExpensesList from "./ExpensesList";
import NewExpense from "./NewExpense";

const Expenses = () => {
  return (
    <div className="flex flex-col space-y-8 min-w-[260px]">
      <span className="font-medium text-xl">Expenses:</span>
      <div className="flex flex-col space-y-2">
        <NewExpense />
        <ExpensesList />
      </div>
    </div>
  );
};

export default Expenses;
