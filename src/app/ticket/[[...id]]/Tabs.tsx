import { twMerge } from "tailwind-merge";
import useCalculationContext from "@app/contexts/calculationContext";
import { useTranslations } from "next-intl";

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
  const { isParticipantsSelected, setIsParticipantsSelected } =
    useCalculationContext();

  const t = useTranslations("common");

  return (
    <div className="lg:hidden flex w-full rounded-full bg-secondary relative py-3 justify-around">
      <Tab
        onClick={() => setIsParticipantsSelected(true)}
        text={t("participants")}
        active={isParticipantsSelected}
      />
      <Tab
        onClick={() => setIsParticipantsSelected(false)}
        text={t("expenses")}
        active={!isParticipantsSelected}
      />

      <div
        className={twMerge(
          "rounded-[inherit] absolute left-0 top-0 bottom-0 w-1/2 bg-primary transition-transform duration-300 z-10",
          !isParticipantsSelected && "translate-x-full"
        )}
      />
    </div>
  );
};

export default Tabs;
