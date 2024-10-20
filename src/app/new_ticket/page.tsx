"use client";
import { useState } from "react";
import { CalculationContextProvider } from "./CalculationContext";
import Expenses from "./Expenses";
import Participants from "./Participants";
import Button from "../components/Button";
import { EXPENSES, PARTICIPANTS } from "../../../mockedData";

const Page = () => {
  const [participants, setParticipants] = useState(PARTICIPANTS);
  const [expenses, setExpenses] = useState(EXPENSES);

  return (
    <CalculationContextProvider
      state={{ participants, setParticipants, expenses, setExpenses }}
    >
      <div className="min-h-screen min-w-[100vh] flex flex-col items-center space-y-20 pt-20">
        <h1 className="text-4xl text-center block">
          Add all participants and expenses
        </h1>
        <div className="flex space-x-40 justify-center mt-20">
          <Participants />
          <Expenses />
        </div>

        <div className="w-full flex justify-center">
          <Button text="Calculate" onClick={() => console.log("first")} />
        </div>
      </div>
    </CalculationContextProvider>
  );
};

export default Page;
