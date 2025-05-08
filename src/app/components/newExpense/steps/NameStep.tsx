import { NewExpenseStepsEnum } from "@/app/ticket/[[...id]]/NewExpenseModal";
import { getCarouselStyles, StepContainer } from "../utils/stepUtils";

interface NameStepProps {
  value: string;
  setValue: (e: string) => void;
  currentStep: NewExpenseStepsEnum;
}

const NameStep = ({ value, setValue, currentStep }: NameStepProps) => {
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

export default NameStep;
