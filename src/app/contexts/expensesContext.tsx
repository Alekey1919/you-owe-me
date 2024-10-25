import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface IExpensesContext {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  editingIndex: number | null;
  setEditingIndex: Dispatch<SetStateAction<null | number>>;
}

const ExpensesContext = createContext({});

export const ExpensesContextProvider = ({
  children,
  state,
}: {
  children: any;
  state: IExpensesContext;
}) => {
  return (
    <ExpensesContext.Provider value={state}>
      {children}
    </ExpensesContext.Provider>
  );
};

const useExpensesContext = () => {
  const state = useContext(ExpensesContext) as IExpensesContext;

  return state;
};

export default useExpensesContext;
