import { twMerge } from "tailwind-merge";
import useCalculationContext from "@app/contexts/calculationContext";
import { NewExpenseStepsEnum } from "@/app/ticket/[[...id]]/NewExpenseModal";
import { IPayedAmounts } from "@app/types/types";
import { getCarouselStyles, StepContainer } from "../utils/stepUtils";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface PayersStepProps {
  currentStep: NewExpenseStepsEnum;
  fullPrice: number;
  handlePayerAmount: (value: { payer: string; amount: number }) => void;
  payedAmounts: IPayedAmounts;
  isOpen: boolean;
  handleFullPayment: (payer: string) => void;
}

const Button = ({
  text,
  isActive,
  onClick,
}: {
  text: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={twMerge(
        "border-0 bg-transparent text-accent transition-opacity duration-300",
        !isActive && "opacity-50"
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const PayersStep = ({
  currentStep,
  fullPrice,
  handlePayerAmount,
  handleFullPayment,
  payedAmounts,
  isOpen,
}: PayersStepProps) => {
  const [isMultiPayer, setIsMultiPayer] = useState(false);
  const {
    ticketData: { participants },
  } = useCalculationContext();

  const t = useTranslations();

  const onChange = (e: any, payer: string) => {
    let value = e.target.value === "" ? 0 : parseInt(e.target.value);

    if (isNaN(value)) return;

    const onlyPayer = !Object.keys(payedAmounts).filter((payerKey) => {
      if (payerKey === payer) return;

      return payedAmounts[payerKey] > 0;
    }).length;

    // Make sure the total amount equals the price of the expense
    // Let's say the full price is $1000, no one can pay more than that
    let maxValue = fullPrice;

    // Also, the same happens with combined values. If first payer pays $600 a second payer can't pay more than $400.
    if (!onlyPayer) {
      Object.keys(payedAmounts).forEach((payerKey) => {
        if (payerKey === payer) return;

        // Subtract the amounts payed already from the full price to calculate how much is left to pay
        maxValue -= payedAmounts[payerKey];
      });
    }

    // If the amount entered is more than that user can pay it's set to the maxValue
    if (value > maxValue) {
      value = maxValue;
    }

    handlePayerAmount({ payer, amount: value });
  };

  return (
    <StepContainer
      styles={getCarouselStyles(currentStep, NewExpenseStepsEnum.Payers)}
      classNames={twMerge("transition-height", isOpen && "open")}
    >
      <div className="flex flex-col space-y-2 w-full cursor-pointer">
        <div className="w-full flex justify-between mb-4">
          <Button
            text={t("common.singlePayer")}
            isActive={!isMultiPayer}
            onClick={() => setIsMultiPayer(false)}
          />
          <Button
            text={t("common.multiplePayers")}
            isActive={isMultiPayer}
            onClick={() => setIsMultiPayer(true)}
          />
        </div>
        {participants.map((participant, index) => {
          return (
            <div
              className="box flex justify-between relative overflow-hidden"
              key={index}
            >
              <span>{participant}</span>

              <button
                className={twMerge(
                  "bg-background text-accent rounded-lg px-4 flex items-center text-sm transition-all duration-300",
                  "absolute top-0 bottom-0 my-auto right-2 h-fit py-1",
                  payedAmounts[participant] !== fullPrice && "opacity-50",
                  isMultiPayer ? "-translate-y-[150%]" : "translate-y-0"
                )}
                onClick={() => handleFullPayment(participant)}
              >
                {t("common.payed")}
              </button>

              <div
                className={twMerge(
                  "flex space-x-4 transition-all duration-300",
                  !isMultiPayer && "translate-y-[150%]"
                )}
              >
                <span>$</span>
                <input
                  type="number"
                  max={fullPrice}
                  min={0}
                  className="w-20 bg-transparent "
                  placeholder="0"
                  value={payedAmounts[participant] || 0}
                  onChange={(e) => onChange(e, participant)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </StepContainer>
  );
};

export default PayersStep;
