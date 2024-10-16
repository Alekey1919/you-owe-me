import React, { useCallback, useEffect, useMemo, useState } from "react";
import useCalculationContext from "./CalculationContext";
import {
  ConsumersStep,
  NameStep,
  PayersStep,
  PriceStep,
} from "./NewExpenseSteps";
import { twMerge } from "tailwind-merge";
import BackArrow from "@public/images/back-arrow.svg";
import Image from "next/image";
import { IConsumerStates, IPayedAmounts } from "../types/expenseTypes";

export enum NewExpenseStepsEnum {
  Name,
  Price,
  Consumers,
  Payers,
}

const NewExpense = () => {
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [consumerStates, setConsumerStates] = useState<IConsumerStates>({});
  const [currentStep, setCurrentStep] = useState(NewExpenseStepsEnum.Name);
  const [payedAmounts, setPayedAmounts] = useState<IPayedAmounts>({});

  const { participants, setExpenses } = useCalculationContext();

  const selectConsumer = (participant: string) => {
    setConsumerStates((curr) => {
      const _curr = { ...curr };

      _curr[participant] = !_curr[participant];

      return _curr;
    });
  };

  const nextDisabled = useMemo(() => {
    switch (currentStep) {
      case NewExpenseStepsEnum.Name:
        return !name;
      case NewExpenseStepsEnum.Price:
        return price < 1;
      case NewExpenseStepsEnum.Consumers:
        // Return true if there's no consumer
        return (
          Object.values(consumerStates).filter((payed) => payed).length === 0
        );
      default:
        return Object.values(payedAmounts).length === 0;
    }
  }, [consumerStates, currentStep, name, payedAmounts, price]);

  const selectAllConsumers = () => {
    setConsumerStates((curr) => {
      const _curr = { ...curr };

      Object.keys(_curr).map((key) => (_curr[key] = true));

      return _curr;
    });
  };

  const saveExpense = useCallback(() => {
    setExpenses((curr) => {
      const _curr = [...curr, { name, price, payedAmounts: payedAmounts }];

      return _curr;
    });

    setShowModal(false);
  }, [payedAmounts, setExpenses, name, price]);

  const handleNext = useCallback(() => {
    if (nextDisabled) return;
    if (currentStep === NewExpenseStepsEnum.Payers) {
      saveExpense();
    } else {
      setCurrentStep((curr) => curr + 1);
    }
  }, [currentStep, nextDisabled, saveExpense]);

  const handlePayerAmount = ({
    payer,
    amount,
  }: {
    payer: string;
    amount: number;
  }) => {
    setPayedAmounts((curr) => {
      const _curr = { ...curr };

      _curr[payer] = amount;

      return _curr;
    });
  };

  // Initialize consumers state
  useEffect(() => {
    const _consumerStates: IConsumerStates = {};

    participants.forEach((participant) => {
      _consumerStates[participant] = true;
    });

    setConsumerStates(_consumerStates);
  }, [participants]);

  // Clearing all states when closing the modal
  // Wait fot the opacity animation to happen before
  useEffect(() => {
    if (!showModal) {
      setTimeout(() => {
        setName("");
        setPrice(0);
        setCurrentStep(NewExpenseStepsEnum.Name);
      }, 300);
    }
  }, [showModal]);

  const titles = ["Name", "Price", "Consumers", "Payers"];

  const handleExit = (e: any) => {
    if (e.target.id === "modal-container") {
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        className="box !bg-primary text-secondary"
        onClick={() => setShowModal(true)}
      >
        Add expense
      </button>

      <div
        className={twMerge(
          "fixed top-0 left-0 right-0 bottom-0 bg-[#000000a9] flex items-center justify-center !m-0 z-[100] transition-all duration-300",
          !showModal && "opacity-0 pointer-events-none"
        )}
        id="modal-container"
        onClick={handleExit}
        style={{ backdropFilter: "blur(10px)" }}
      >
        <div className="flex flex-col space-y-5 items-between justify-center w-[400px] bg-background rounded-xl p-4 relative">
          <h1 className="text-3xl text-center">{titles[currentStep]}</h1>
          <div className="w-full flex overflow-visible transition-transform ">
            <NameStep
              value={name}
              setValue={setName}
              currentStep={currentStep}
            />

            <PriceStep
              value={price}
              setValue={setPrice}
              currentStep={currentStep}
            />

            <ConsumersStep
              consumerStates={consumerStates}
              selectAllConsumers={selectAllConsumers}
              selectConsumer={selectConsumer}
              currentStep={currentStep}
            />

            <PayersStep
              currentStep={currentStep}
              fullPrice={price}
              handlePayerAmount={handlePayerAmount}
              payedAmounts={payedAmounts}
            />
          </div>

          <button
            className="box !bg-primary text-secondary disabled:!bg-gray-800 disabled:opacity-50 transition-all"
            onClick={handleNext}
            disabled={nextDisabled}
          >
            {currentStep !== NewExpenseStepsEnum.Payers ? "Next" : "Save"}
          </button>

          {currentStep > NewExpenseStepsEnum.Name && (
            <Image
              src={BackArrow}
              alt="Back"
              className="w-9 absolute top-4 left-4 !mt-0 cursor-pointer"
              onClick={() => setCurrentStep((curr) => curr - 1)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NewExpense;
