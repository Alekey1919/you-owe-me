import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ITicket } from "../types/types";

interface ICalculationContext {
  ticketData: ITicket;
  setTicketData: Dispatch<SetStateAction<ITicket>>;
  lgScreen: boolean;
  isTouch: boolean;
  isParticipantsSelected: boolean;
  setIsParticipantsSelected: Dispatch<SetStateAction<boolean>>;
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
