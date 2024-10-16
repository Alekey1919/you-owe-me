"use client";
import { useState } from "react";
import { CalculationContextProvider } from "./CalculationContext";
import Expenses from "./Expenses";
import Participants from "./Participants";
import { IExpense } from "../types/expenseTypes";

const PARTICIPANTS = ["Alekey", "Crisol", "Octi", "Anto", "Mateo", "Cimi"];

const EXPENSES: IExpense[] = [
  {
    name: "Nafta",
    price: 10000,
    payedAmounts: {
      Alekey: 0,
      Crisol: 10000,
      Octi: 0,
      Anto: 0,
      Mateo: 0,
      Cimi: 0,
    },
  },
  {
    name: "Cancha",
    price: 15000,
    payedAmounts: {
      Alekey: 10000,
      Crisol: 5000,
      Octi: 0,
      Anto: 0,
      Mateo: 0,
      Cimi: 0,
    },
  },
  {
    name: "Super",
    price: 30000,
    payedAmounts: {
      Alekey: 0,
      Crisol: 0,
      Octi: 30000,
      Anto: 0,
      Mateo: 0,
      Cimi: 0,
    },
  },
  {
    name: "Helado",
    price: 8000,
    payedAmounts: {
      Alekey: 0,
      Crisol: 0,
      Octi: 0,
      Anto: 8000,
      Mateo: 0,
      Cimi: 0,
    },
  },
];

const Page = () => {
  const [participants, setParticipants] = useState(PARTICIPANTS);
  const [expenses, setExpenses] = useState(EXPENSES);

  return (
    <CalculationContextProvider
      state={{ participants, setParticipants, expenses, setExpenses }}
    >
      <div className="min-h-screen min-w-[100vh]">
        <h1 className="text-4xl text-center block pt-20">
          Add all participants and expenses
        </h1>
        <div className="flex space-x-40 justify-center mt-20">
          <Participants />
          <Expenses />
        </div>
      </div>
    </CalculationContextProvider>
  );
};

export default Page;
