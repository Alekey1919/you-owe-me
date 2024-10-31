import { createContext, useContext } from "react";

interface IResultsContext {
  highlightedExpense: string;
  highlightExpense: (expenseName: string) => void;
  participants: string[];
}

const ResultContext = createContext({});

export const ResultContextProvider = ({
  children,
  state,
}: {
  children: any;
  state: IResultsContext;
}) => {
  return (
    <ResultContext.Provider value={state}>{children}</ResultContext.Provider>
  );
};

const useResultContext = () => {
  const state = useContext(ResultContext) as IResultsContext;

  return state;
};

export default useResultContext;
