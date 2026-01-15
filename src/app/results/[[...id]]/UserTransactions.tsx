import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { ITransaction } from "../../types/types";

const UserTransactions = ({
  transactions,
}: {
  transactions: ITransaction[];
}) => {
  const t = useTranslations("results");

  const copyToClipboard = (amount: string) => {
    navigator.clipboard.writeText(amount);

    toast.success(t("amountCopied"));
  };

  return (
    <div className="box">
      <span className="font-medium">
        {transactions[0].payer} {t("pays")}:
      </span>
      <div className="flex flex-col space-y-2">
        {transactions.map((transaction, index) => {
          const roundedAmount = Math.round(transaction.amount);

          return (
            <span key={index}>
              <span
                onClick={() => copyToClipboard(roundedAmount.toString())}
                className="cursor-pointer hover:underline"
              >
                ${roundedAmount.toLocaleString("de-DE")}{" "}
              </span>
              {t("to")} {transaction.payee}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default UserTransactions;
