import { ITicket, IExpense } from "@/app/types/types";

export const MOCKED_TICKET: ITicket = {
  id: "013130987",
  name: "Hogwarts visit",
  date: 0,
  notes: "Some notes I guess",
  participants: ["Alekey", "Crisol", "Octi", "Anto", "Mateo", "Cimi"],
  expenses: [
    {
      name: "Nafta Fox",
      price: 10000,
      payedAmounts: {
        Alekey: 0,
        Crisol: 10000,
        Anto: 0,
        Mateo: 0,
        Cimi: 0,
      },
      consumers: ["Alekey", "Crisol", "Anto", "Mateo", "Cimi"],
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
      consumers: ["Alekey", "Crisol", "Octi", "Anto", "Mateo", "Cimi"],
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
      consumers: ["Alekey", "Crisol", "Octi", "Anto", "Mateo", "Cimi"],
    },
    {
      name: "Helado",
      price: 8000,
      payedAmounts: {
        Crisol: 0,
        Octi: 0,
        Anto: 0,
        Mateo: 0,
        Cimi: 0,
        Alekey: 8000,
      },
      consumers: ["Crisol", "Octi", "Anto", "Mateo", "Cimi"],
    },
  ],
};

export const PARTICIPANTS = [
  "Alekey",
  "Crisol",
  "Octi",
  "Anto",
  "Mateo",
  "Cimi",
];

export const EXPENSES: IExpense[] = [
  {
    name: "Nafta Fox",
    price: 10000,
    payedAmounts: {
      Alekey: 0,
      Crisol: 10000,
      Anto: 0,
      Mateo: 0,
      Cimi: 0,
    },
    consumers: ["Alekey", "Crisol", "Anto", "Mateo", "Cimi"],
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
    consumers: ["Alekey", "Crisol", "Octi", "Anto", "Mateo", "Cimi"],
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
    consumers: ["Alekey", "Crisol", "Octi", "Anto", "Mateo", "Cimi"],
  },
  {
    name: "Helado",
    price: 8000,
    payedAmounts: {
      Crisol: 0,
      Octi: 0,
      Anto: 8000,
      Mateo: 0,
      Cimi: 0,
    },
    consumers: ["Crisol", "Octi", "Anto", "Mateo", "Cimi"],
  },
];
