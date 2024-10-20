import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { IExpense } from "../types/types";

interface ICalculationContext {
  participants: string[];
  setParticipants: Dispatch<SetStateAction<string[]>>;
  expenses: IExpense[];
  setExpenses: Dispatch<SetStateAction<IExpense[]>>;
}

const CalculationContext = createContext({});

export const CalculationContextProvider = ({
  children,
  state,
}: {
  children: any;
  state: ICalculationContext;
}) => {
  return (
    <CalculationContext.Provider value={state}>
      {children}
    </CalculationContext.Provider>
  );
};

const useCalculationContext = () => {
  const state = useContext(CalculationContext) as ICalculationContext;

  return state;
};

export default useCalculationContext;
