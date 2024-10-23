import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface ICalculationContext {
  participants: string[];
  setParticipants: Dispatch<SetStateAction<string[]>>;
  lgScreen: boolean;
  isTouch: boolean;
  isLeftSelected: boolean;
  setIsLeftSelected: Dispatch<SetStateAction<boolean>>;
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
