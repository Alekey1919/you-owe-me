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

export enum NewExpenseStepsEnum {
  Name,
  Price,
  Consumers,
  Payers,
}

export interface IConsumerStates {
  [key: string]: boolean;
}

export interface IPayers {
  [key: string]: number;
}

const NewExpense = () => {
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [consumerStates, setConsumerStates] = useState<IConsumerStates>({});
  const [currentStep, setCurrentStep] = useState(NewExpenseStepsEnum.Name);
  const [payedAmounts, setPayedAmounts] = useState<IPayers>({});

  const { participants, setExpenses } = useCalculationContext();

  const allConsumersSelected = useMemo(() => {
    return (
      Object.values(consumerStates).filter((v) => v === false).length === 0
    );
  }, [consumerStates]);

  const selectConsumer = (participant: string) => {
    setConsumerStates((curr) => {
      const _curr = { ...curr };

      _curr[participant] = !_curr[participant];

      return _curr;
    });
  };

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

  const handleNext = () => {
    if (currentStep === NewExpenseStepsEnum.Payers) {
      saveExpense();
    } else {
      setCurrentStep((curr) => curr + 1);
    }
  };

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

  // Initialize object states
  useEffect(() => {
    const _consumerStates: IConsumerStates = {};
    const _payers: IPayers = {};

    participants.forEach((participant) => {
      _consumerStates[participant] = true;
      _payers[participant] = 0;
    });

    setConsumerStates(_consumerStates);
  }, [participants]);

  // Clearing all states when closing the modal
  useEffect(() => {
    if (!showModal) {
      setName("");
      setPrice(0);
      setConsumerStates({});
      setCurrentStep(NewExpenseStepsEnum.Name);
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
              allConsumersSelected={allConsumersSelected}
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
            className="box !bg-primary text-secondary"
            onClick={handleNext}
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
