import { CSSProperties } from "react";
import { NewExpenseStepsEnum } from "@/app/ticket/[[...id]]/NewExpenseModal";
import { twMerge } from "tailwind-merge";

export const getCarouselStyles = (
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

export const StepContainer = ({
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
