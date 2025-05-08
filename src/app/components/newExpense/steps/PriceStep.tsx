import { NewExpenseStepsEnum } from "@/app/ticket/[[...id]]/NewExpenseModal";
import { getCarouselStyles, StepContainer } from "../utils/stepUtils";

interface PriceStepProps {
  value: number;
  setValue: (e: number) => void;
  currentStep: NewExpenseStepsEnum;
}

const PriceStep = ({ value, setValue, currentStep }: PriceStepProps) => {
  const onChange = (e: any) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value);
    setValue(value);
  };

  return (
    <StepContainer
      styles={getCarouselStyles(currentStep, NewExpenseStepsEnum.Price)}
    >
      <input
        type="number"
        value={value}
        placeholder="0"
        className="box text-gray-500 !outline-none"
        onChange={onChange}
      />
    </StepContainer>
  );
};

export default PriceStep;
