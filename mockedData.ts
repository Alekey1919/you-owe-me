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

export const MOCKED_TICKET_2: ITicket = {
  id: "",
  name: "",
  date: 0,
  participants: ["Canela", "Mariano", "Alejo"],
  expenses: [
    {
      name: "Food",
      price: 10000,
      payedAmounts: { Canela: 3000, Mariano: 7000 },
      consumers: ["Canela", "Mariano", "Alejo"],
    },
    {
      name: "Ice cream",
      price: 12000,
      payedAmounts: { Alejo: 12000 },
      consumers: ["Canela", "Mariano", "Alejo"],
    },
    {
      name: "Gas",
      price: 5000,
      payedAmounts: { Alejo: 5000 },
      consumers: ["Canela", "Mariano", "Alejo"],
    },
  ],
};

export const ANTO_BIRTHDAY = {
  id: "378aea1f-32b0-4864-bac6-9cae8ba8c9e2",
  name: "Cumple Anto",
  date: "2024-10-27",
  notes: "Incluye sabado y domingo",
  participants: ["Cimi", "Mateo", "Octi", "Cris", "Ale"],
  expenses: [
    {
      name: "Super sabado (almuerzo)",
      price: 21200,
      payedAmounts: {
        Ale: 21200,
      },
      consumers: ["Mateo", "Octi", "Cris", "Ale"],
    },
    {
      name: "Super domingo (trek)",
      price: 46500,
      payedAmounts: {
        Ale: 46500,
      },
      consumers: ["Cimi", "Mateo", "Octi", "Cris", "Ale"],
    },
    {
      name: "Panaderia sabado",
      price: 9100,
      payedAmounts: {
        Ale: 9100,
      },
      consumers: ["Mateo", "Octi", "Cris", "Ale"],
    },
    {
      name: "YPF (surtidas y rocklets)",
      price: 5900,
      payedAmounts: {
        Ale: 5900,
      },
      consumers: ["Cimi", "Mateo", "Octi", "Cris", "Ale"],
    },
    {
      name: "Entrada cumbresita",
      price: 16000,
      payedAmounts: {
        Octi: 8000,
        Ale: 8000,
      },
      consumers: ["Cimi", "Mateo", "Octi", "Cris", "Ale"],
    },
    {
      name: "Matambre sabado",
      price: 25000,
      payedAmounts: {
        Octi: 25000,
      },
      consumers: ["Mateo", "Octi", "Cris", "Ale"],
    },
  ],
};
