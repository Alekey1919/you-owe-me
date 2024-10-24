"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useCalculationContext from "@app/contexts/calculationContext";
import {
  ConsumersStep,
  NameStep,
  PayersStep,
  PriceStep,
} from "./NewExpenseSteps";
import { twMerge } from "tailwind-merge";
import BackArrow from "@public/images/back-arrow.svg";
import Image from "next/image";
import { IConsumerStates, IPayedAmounts } from "@app/types/types";
import { createPortal } from "react-dom";
import useExpensesContext from "@app/contexts/expensesContext";

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
  const { participants } = useCalculationContext();
  const { expenses, setExpenses, editingIndex, setEditingIndex } =
    useExpensesContext();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [consumerStates, setConsumerStates] = useState<IConsumerStates>({});
  const [currentStep, setCurrentStep] = useState(NewExpenseStepsEnum.Name);
  const [payedAmounts, setPayedAmounts] = useState<IPayedAmounts>({});
  const [domReady, setDomReady] = useState(false);

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
    const isEditing = editingIndex !== null;

    const newExpense = {
      name,
      price,
      payedAmounts: payedAmounts,
      participants,
      consumers: Object.keys(consumerStates),
    };

    setExpenses((curr) => {
      const _curr = [...curr];

      if (isEditing) {
        _curr[editingIndex] = newExpense;
      } else {
        _curr.push(newExpense);
      }

      return _curr;
    });

    setShowModal(false);
  }, [
    editingIndex,
    name,
    price,
    payedAmounts,
    participants,
    consumerStates,
    setExpenses,
    setShowModal,
  ]);

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

    const editingExpense = editingIndex ? expenses[editingIndex] : null;

    // When editing an expense we use the payedAmounts to determine
    participants.forEach((participant) => {
      if (editingExpense) {
        _consumerStates[participant] =
          editingExpense.consumers.includes(participant);
      } else {
        _consumerStates[participant] = true;
      }
    });

    setConsumerStates(_consumerStates);
  }, [editingIndex, expenses, participants]);

  // Clearing all states when closing the modal
  // Wait fot the opacity animation to happen before
  useEffect(() => {
    if (!showModal) {
      setTimeout(() => {
        setName("");
        setPrice(0);
        setCurrentStep(NewExpenseStepsEnum.Name);
        setPayedAmounts({});
        setEditingIndex(null);
      }, 300);
    }
  }, [setEditingIndex, showModal]);

  // Re-initialize states when selecting an expense to edit
  useEffect(() => {
    if (editingIndex) {
      const data = expenses[editingIndex];

      setName(data.name);
      setPrice(data.price);
      setPayedAmounts(data.payedAmounts);
    }
  }, [editingIndex, expenses]);

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
