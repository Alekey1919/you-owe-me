"use client";
import { useState } from "react";
import { CalculationContextProvider } from "./CalculationContext";
import Expenses from "./Expenses";
import Participants from "./Participants";
import Button from "../components/Button";
import { EXPENSES, PARTICIPANTS } from "../../../mockedData";
import Tabs from "./Tabs";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "../hooks/useMediaQueryState";

const Page = () => {
  const [participants, setParticipants] = useState(PARTICIPANTS);
  const [expenses, setExpenses] = useState(EXPENSES);

  const [isLeftSelected, setIsLeftSelected] = useState(true);

  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });
  const isTouch = useMediaQueryState({
    query: "(hover: none), (pointer: coarse)",
  });

  return (
    <CalculationContextProvider
      state={{
        participants,
        setParticipants,
        expenses,
        setExpenses,
        lgScreen,
        isTouch,
        isLeftSelected,
        setIsLeftSelected,
      }}
    >
      <div className="min-h-screen w-screen max-w-lg mx-auto lg:min-w-[100vh] flex flex-col items-center space-y-8 lg:space-y-14 3xl:space-y-20 pt-10 3xl:pt-20 px-10">
        <h1 className="title text-center block">
          Add all participants and expenses
        </h1>
        {!lgScreen && <Tabs />}
        <div className="flex lg:space-x-40 lg:justify-center lg:mt-10 w-full overflow-hidden lg:overflow-visible">
          <Participants />
          <Expenses />
        </div>

        {/* TODO: Disable button if there are less than 2 participants or no expenses */}
        <div className="w-full flex justify-center">
          <Button text="Calculate" onClick={() => console.log("first")} />
        </div>
      </div>
      <div id="portal" />
    </CalculationContextProvider>
  );
};

export default Page;
