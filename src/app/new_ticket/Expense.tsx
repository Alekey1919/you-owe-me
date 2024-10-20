import React, {
  CSSProperties,
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IExpense } from "../types/types";
import { twMerge } from "tailwind-merge";
import Cross from "@public/images/cross.svg";
import Image from "next/image";

interface IPaymentPercentages {
  payer: string;
  percentage: number;
}

const Expense = ({
  expenseData: { name, price, payedAmounts },
  deleteExpense,
  styles,
  performingAnimation,
}: {
  expenseData: IExpense;
  deleteExpense: () => void;
  styles: { container?: CSSProperties };
  performingAnimation: boolean;
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const paymentPercentages = useMemo(() => {
    const payers: IPaymentPercentages[] = [];

    Object.keys(payedAmounts).forEach((key) => {
      const payedAmount = payedAmounts[key];
      if (payedAmount) {
        payers.push({ payer: key, percentage: (100 * payedAmount) / price });
      }
    });

    return payers;
  }, [payedAmounts, price]);

  // Close details if a deletion is happening to align the items correctly
  useEffect(() => {
    if (performingAnimation) {
      setShowDetails(false);
    }
  }, [performingAnimation]);

  return (
    <div
      className="flex flex-col relative box !p-0"
      onPointerEnter={() => setShowDetails(true)}
      onPointerLeave={() => setShowDetails(false)}
      style={styles.container}
    >
      <div
        className={twMerge(
          "w-full flex justify-between p-3 px-4 transition-all relative"
        )}
      >
        <span>{name}</span>
        <span>{price}</span>

        <div
          className={twMerge(
            "top-0 bottom-0 left-0 opacity-0 absolute duration-300 flex items-center pr-4",
            showDetails && "opacity-100 -translate-x-[100%]"
          )}
          style={{ transition: "opacity 100ms, transform 300ms" }}
        >
          <Image
            src={Cross}
            alt="Delete"
            className="w-6 cursor-pointer"
            onClick={deleteExpense}
          />
        </div>
      </div>
      <div
        className={twMerge(
          "flex transition-height rounded-b-[inherit]",
          showDetails && "open"
        )}
      >
        {paymentPercentages.map((payer, index) => {
          return (
            <Fragment key={index}>
              {/* Separator between payers */}
              {index % 2 !== 0 && <div className="w-[1.5px] bg-secondary" />}
              <div
                className="bg-gray-400 text-center text-background"
                style={{ width: `${payer.percentage}%` }}
              >
                {payer.payer}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Expense;
