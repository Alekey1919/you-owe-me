export interface IConsumerStates {
  [key: string]: boolean;
}

export interface IPayedAmounts {
  [key: string]: number;
}

export interface IExpense {
  name: string;
  price: number;
  payedAmounts: IPayedAmounts;
  consumers: string[];
}

export interface ITicket {
  id: string;
  name: string;
  date: number;
  notes?: string;
  participants: string[];
  expenses: IExpense[];
}

export interface ITransactionData {
  participant: string;
  balance: number;
}

export interface IUserBalanceAmountsDetails {
  productName: string;
  amount: number;
}

export interface IUserBalanceAmounts {
  total: number;
  details: IUserBalanceAmountsDetails[];
}

export interface IUserBalance {
  amountToPay: IUserBalanceAmounts;
  amountPayed: IUserBalanceAmounts;
  balance: number;
}

export interface IUserBalances {
  [key: string]: IUserBalance;
}

export interface ITransaction {
  payer: string;
  payee: string;
  amount: number;
}
