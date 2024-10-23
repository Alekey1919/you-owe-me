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
import Edit from "@public/images/edit.svg";
import Image from "next/image";
import useCalculationContext from "./CalculationContext";

interface IPaymentPercentages {
  payer: string;
  percentage: number;
}

const Expense = ({
  expenseData: { name, price, payedAmounts },
  deleteExpense,
  styles,
  performingAnimation,
  isFocusedTouch,
  handleTouch,
}: {
  expenseData: IExpense;
  deleteExpense: () => void;
  styles: { container?: CSSProperties };
  performingAnimation: boolean;
  isFocusedTouch: boolean;
  handleTouch: (e: any) => void;
}) => {
  const { isTouch } = useCalculationContext();
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

  useEffect(() => {
    setShowDetails(isFocusedTouch);
  }, [isFocusedTouch]);

  return (
    <div
      className="flex flex-col relative box !p-0 !pt-3 expense"
      onTouchStart={handleTouch}
      onPointerEnter={() => (isTouch ? undefined : setShowDetails(true))}
      onPointerLeave={() => (isTouch ? undefined : setShowDetails(false))}
      style={styles.container}
    >
      <div
        className={twMerge(
          "w-full flex justify-center space-x-6 px-3 transition-height",
          showDetails && "open"
        )}
      >
        <Image src={Edit} alt="Edit" className="w-4 cursor-pointer" />
        <Image
          src={Cross}
          alt="Close"
          className="w-4 cursor-pointer"
          onClick={deleteExpense}
        />
      </div>
      <div
        className={twMerge(
          "w-full flex justify-between pb-3 px-4 transition-all relative pointer-events-none"
        )}
      >
        <span>{name}</span>
        <span>${price}</span>
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
