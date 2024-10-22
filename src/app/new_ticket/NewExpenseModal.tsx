"use client";

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
import { IConsumerStates, IPayedAmounts } from "../types/types";
import { createPortal } from "react-dom";

export enum NewExpenseStepsEnum {
  Name,
  Price,
  Consumers,
  Payers,
}

const NewExpenseModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [consumerStates, setConsumerStates] = useState<IConsumerStates>({});
  const [currentStep, setCurrentStep] = useState(NewExpenseStepsEnum.Name);
  const [payedAmounts, setPayedAmounts] = useState<IPayedAmounts>({});
  const [domReady, setDomReady] = useState(false);

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
        // Return true if the combined sum of all the payments doesn't add up to the price
        return Object.values(payedAmounts).reduce((a, b) => a + b, 0) < price;
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
      const _curr = [
        ...curr,
        {
          name,
          price,
          payedAmounts: payedAmounts,
          participants,
          consumers: Object.keys(consumerStates),
        },
      ];

      return _curr;
    });

    setShowModal(false);
  }, [setExpenses, name, price, payedAmounts, participants, consumerStates]);

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
        setPayedAmounts({});
      }, 300);
    }
  }, [showModal]);

  useEffect(() => {
    setDomReady(true);
  }, []);

  const titles = ["Name", "Price", "Consumers", "Payers"];

  const handleExit = (e: any) => {
    if (e.target.id === "modal-container") {
      setShowModal(false);
    }
  };

  if (!domReady) return <></>;

  return createPortal(
    <div
      className={twMerge(
        "fixed top-0 left-0 right-0 bottom-0 bg-[#000000a9] flex items-center justify-center !m-0 z-[100] transition-all duration-300 w-full h-full",
        !showModal && "opacity-0 pointer-events-none -z-10"
      )}
      id="modal-container"
      onClick={handleExit}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="flex flex-col space-y-5 items-between justify-center w-10/12 max-w-[350px] lg:max-w-[unset] lg:w-[400px] bg-background rounded-xl p-4 relative">
        <h1 className="title text-center">{titles[currentStep]}</h1>
        <div className="w-full flex overflow-visible transition-transform ">
          <NameStep value={name} setValue={setName} currentStep={currentStep} />

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
    </div>,
    document.getElementById("portal")!
  );
};

export default NewExpenseModal;