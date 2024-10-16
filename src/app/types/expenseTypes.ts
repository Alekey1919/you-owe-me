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
}
