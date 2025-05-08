import { Dispatch, SetStateAction, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import useCalculationContext from "@app/contexts/calculationContext";
import { NewExpenseStepsEnum } from "@/app/ticket/[[...id]]/NewExpenseModal";
import { IConsumerStates } from "@app/types/types";
import { useTranslations } from "next-intl";
import { getCarouselStyles, StepContainer } from "../utils/stepUtils";

interface ConsumersStepProps {
  consumerStates: IConsumerStates;
  selectAllConsumers: () => void;
  selectConsumer: (value: string) => void;
  currentStep: NewExpenseStepsEnum;
  showAllParticipants: boolean;
  setShowAllParticipants: Dispatch<SetStateAction<boolean>>;
}

const ConsumersStep = ({
  consumerStates,
  selectAllConsumers,
  selectConsumer,
  currentStep,
  showAllParticipants,
  setShowAllParticipants,
}: ConsumersStepProps) => {
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
                "box w-full transition-colors !bg-muted-accent",
                allConsumersSelected ? "!bg-accent text-accent" : ""
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
              <div className="w-8 h-4 rounded-full relative bg-muted-background">
                <div
                  className={twMerge(
                    "absolute w-1/2 h-full rounded-[inherit] left-0 top-0 transition-transform duration-300 ease-in-out",
                    showAllParticipants
                      ? "bg-accent translate-x-full"
                      : " bg-muted-accent"
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
                    "box transition-colors cursor-pointer !bg-muted-accent",
                    consumerStates[participant] && "!bg-accent text-accent"
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

export default ConsumersStep;
