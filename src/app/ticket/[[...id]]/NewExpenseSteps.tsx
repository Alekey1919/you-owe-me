import { CSSProperties, Dispatch, SetStateAction, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import useCalculationContext from "@app/contexts/calculationContext";
import { NewExpenseStepsEnum } from "./NewExpenseModal";
import { IConsumerStates, IPayedAmounts } from "@app/types/types";
import { useTranslations } from "next-intl";

const getCarouselStyles = (
  stepNumber: NewExpenseStepsEnum,
  currentStep: NewExpenseStepsEnum
) => {
  const isVisible = stepNumber === currentStep;
  return {
    opacity: isVisible ? "1" : "0",
    transform: `translateX(-${stepNumber * 100}%)`,
    pointerEvents: isVisible ? "auto" : "none",
  } as CSSProperties;
};

const StepContainer = ({
  children,
  styles,
  classNames,
}: {
  children: JSX.Element;
  styles?: CSSProperties;
  classNames?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex space-x-10 items-center w-full shrink-0 transition-all duration-300 justify-center",
        classNames
      )}
      style={styles}
    >
      {children}
    </div>
  );
};

export const NameStep = ({
  value,
  setValue,
  currentStep,
}: {
  value: string;
  setValue: (e: string) => void;
  currentStep: NewExpenseStepsEnum;
}) => {
  return (
    <StepContainer
      styles={getCarouselStyles(currentStep, NewExpenseStepsEnum.Name)}
    >
      <input
        type="text"
        value={value}
        placeholder="Food"
        className="box text-gray-500 !outline-none"
        onChange={(e) => setValue(e.target.value)}
      />
    </StepContainer>
  );
};

export const PriceStep = ({
  value,
  setValue,
  currentStep,
}: {
  value: number;
  setValue: (e: number) => void;
  currentStep: NewExpenseStepsEnum;
}) => {
  const onChange = (e: any) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value);

    setValue(value);
  };
  return (
    <StepContainer
      styles={getCarouselStyles(currentStep, NewExpenseStepsEnum.Price)}
    >
      <input
        type="text"
        value={value}
        placeholder="0"
        className="box text-gray-500 !outline-none"
        onChange={onChange}
      />
    </StepContainer>
  );
};

export const ConsumersStep = ({
  consumerStates,
  selectAllConsumers,
  selectConsumer,
  currentStep,
  showAllParticipants,
  setShowAllParticipants,
}: {
  consumerStates: IConsumerStates;
  selectAllConsumers: () => void;
  selectConsumer: (value: string) => void;
  currentStep: NewExpenseStepsEnum;
  showAllParticipants: boolean;
  setShowAllParticipants: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    ticketData: { participants },
  } = useCalculationContext();

  const t = useTranslations();

  const allConsumersSelected = useMemo(() => {
    return (
      Object.values(consumerStates).filter((v) => v === false).length === 0
    );
  }, [consumerStates]);

  return (
    <>
      <StepContainer
        styles={getCarouselStyles(currentStep, NewExpenseStepsEnum.Consumers)}
      >
        <div className="flex flex-col w-full space-y-4">
          <div className="flex space-x-4 w-full justify-around">
            <button
              className={twMerge(
                "box w-full transition-colors",
                allConsumersSelected ? "!bg-primary text-secondary" : ""
              )}
              onClick={selectAllConsumers}
            >
              {t("common.everyone")}
            </button>
            <div
              className="flex flex-col space-y-4 items-center w-full"
              onClick={() => setShowAllParticipants((curr) => !curr)}
            >
              <span>{t("ticket.seeAll")}</span>
              <div className="w-8 h-4 bg-secondary rounded-full relative">
                <div
                  className={twMerge(
                    "absolute w-1/2 h-full rounded-[inherit] left-0 top-0 transition-transform",
                    showAllParticipants
                      ? "bg-primary translate-x-full"
                      : " bg-gray-500"
                  )}
                />
              </div>
            </div>
          </div>
          <div
            className={twMerge(
              "flex flex-col space-y-2 transition-height",
              showAllParticipants && "open"
            )}
          >
            {participants.map((participant, index) => {
              return (
                <div
                  className={twMerge(
                    "box transition-colors cursor-pointer",
                    consumerStates[participant] && "!bg-primary text-secondary"
                  )}
                  onClick={() => selectConsumer(participant)}
                  key={index}
                >
                  {participant}
                </div>
              );
            })}
          </div>
        </div>
      </StepContainer>
    </>
  );
};

export const PayersStep = ({
  currentStep,
  fullPrice,
  handlePayerAmount,
  payedAmounts,
  isOpen,
}: {
  currentStep: NewExpenseStepsEnum;
  fullPrice: number;
  handlePayerAmount: (value: { payer: string; amount: number }) => void;
  payedAmounts: IPayedAmounts;
  isOpen: boolean;
}) => {
  const {
    ticketData: { participants },
  } = useCalculationContext();

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
        {participants.map((participant, index) => {
          return (
            <div className="box flex justify-between" key={index}>
              <span>{participant}</span>
              <div className="flex space-x-4">
                <span>$</span>
                <input
                  type="text"
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
