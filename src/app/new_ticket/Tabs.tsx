import { twMerge } from "tailwind-merge";
import useCalculationContext from "../contexts/calculationContext";

const Tab = ({
  text,
  onClick,
  active,
}: {
  text: string;
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "z-20 w-full text-center",
        active && "text-background"
      )}
    >
      {text}
    </div>
  );
};

const Tabs = () => {
  const { isLeftSelected, setIsLeftSelected } = useCalculationContext();

  return (
    <div className="lg:hidden flex w-full rounded-full bg-secondary relative py-3 justify-around">
      <Tab
        onClick={() => setIsLeftSelected(true)}
        text={"Participants"}
        active={isLeftSelected}
      />
      <Tab
        onClick={() => setIsLeftSelected(false)}
        text={"Expenses"}
        active={!isLeftSelected}
      />

      <div
        className={twMerge(
          "rounded-[inherit] absolute left-0 top-0 bottom-0 w-1/2 bg-primary transition-transform duration-300 z-10",
          !isLeftSelected && "translate-x-full"
        )}
      />
      {/* <Tab text="Participants" selected />
      <Tab text="Expenses" selected={false} /> */}
    </div>
  );
};

export default Tabs;
