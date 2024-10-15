import useCalculationContext from "./CalculationContext";
import NewExpense from "./NewExpense";

const Expenses = () => {
  const { expenses } = useCalculationContext();

  return (
    <div className="flex flex-col space-y-8">
      <span className="font-medium text-xl">Expenses:</span>
      <NewExpense />
      <div className="flex flex-col space-y-2 relative">
        {expenses.map((expense, index) => {
          return (
            <div className="" key={index}>
              {expense.name}
            </div>
          );
        })}
        {/* <NewParticipant handleAdd={handleAdd} />
        <ParticipantList
          participants={participants}
          removeParticipant={removeParticipant}
          animationState={animationState}
        /> */}
      </div>
    </div>
  );
};

export default Expenses;
