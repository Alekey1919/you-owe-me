import { useEffect, useState } from "react";
import { MOCKED_TICKET } from "../../../mockedData";
import {
  IExpense,
  ITicket,
  ITransaction,
  ITransactionData,
  IUserBalances,
} from "../types/types";
import { useParams } from "next/navigation";

const useSplitTicket = () => {
  const [userBalances, setUserBalances] = useState<IUserBalances>({});
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const params = useParams();

  const calculateSplit = (ticket: ITicket) => {
    const _userBalances: IUserBalances = {}; // Track each participant's balance (positive = owes money, negative = should be reimbursed)

    // Initialize balances for each participant
    ticket.participants.forEach((participant) => {
      _userBalances[participant] = {
        amountToPay: { total: 0, details: [] },
        amountPayed: { total: 0, details: [] },
        balance: 0,
      };
    });

    // Loop through each expense to calculate who owes what
    ticket.expenses.forEach((expense) => {
      const consumers = expense.consumers;
      const pricePerConsumer = expense.price / consumers.length;

      // Calculate how much each consumer should pay for this expense
      consumers.forEach((consumer) => {
        _userBalances[consumer].balance -= pricePerConsumer;

        _userBalances[consumer].amountToPay.total += pricePerConsumer;
        _userBalances[consumer].amountToPay.details.push({
          productName: expense.name,
          amount: pricePerConsumer,
        });
      });

      // Track how much each participant has paid
      Object.entries(expense.payedAmounts).forEach(([payer, amountPaid]) => {
        _userBalances[payer].balance += amountPaid;

        if (amountPaid) {
          _userBalances[payer].amountPayed.total = amountPaid;
          _userBalances[payer].amountPayed.details.push({
            productName: expense.name,
            amount: amountPaid,
          });
        }
      });
    });

    return _userBalances;
  };

  const minimizeTransactions = (userBalances: IUserBalances) => {
    // Convert balances object into an array of participants with their balances
    const debtors: ITransactionData[] = []; // Those who owe money (negative balance)
    const creditors: ITransactionData[] = []; // Those who need to be reimbursed (positive balance)

    Object.entries(userBalances).forEach(([participant, userBalance]) => {
      if (userBalance.balance < 0) {
        debtors.push({ participant, balance: Math.abs(userBalance.balance) }); // Owes money
      } else if (userBalance.balance > 0) {
        creditors.push({ participant, balance: userBalance.balance }); // Needs reimbursement
      }
    });

    const _transactions: ITransaction[] = [];

    // Match debtors with creditors
    while (debtors.length > 0 && creditors.length > 0) {
      const debtor = debtors[0]; // The person who owes the most
      const creditor = creditors[0]; // The person who needs the most reimbursement

      const transactionAmount = Math.min(debtor.balance, creditor.balance);

      // Save the transaction
      _transactions.push({
        payer: debtor.participant,
        payee: creditor.participant,
        amount: transactionAmount,
      });

      // Update the balances
      debtor.balance -= transactionAmount;
      creditor.balance -= transactionAmount;

      // Remove fully settled participants
      if (debtor.balance === 0) {
        debtors.shift(); // Remove the debtor
      }
      if (creditor.balance === 0) {
        creditors.shift(); // Remove the creditor
      }
    }

    return _transactions;
  };

  useEffect(() => {
    // Fetch ticket from localstore here
    const currentTicket = localStorage.getItem("currentTicket");

    if (currentTicket) {
      const ticket: ITicket = JSON.parse(currentTicket);
      setExpenses(ticket.expenses);

      const balances = calculateSplit(ticket);
      setUserBalances(balances);

      const transactions = minimizeTransactions(balances);
      setTransactions(transactions);
    } else {
      // TODO: fetch ticket
      setExpenses(MOCKED_TICKET.expenses);

      const balances = calculateSplit(MOCKED_TICKET);
      setUserBalances(balances);

      const transactions = minimizeTransactions(balances);
      setTransactions(transactions);
    }
  }, [params]);

  return { userBalances, transactions, expenses };
};

export default useSplitTicket;
