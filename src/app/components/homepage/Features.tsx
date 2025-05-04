import SectionTitle from "./SectionTitle";
import CalculatorIcon from "@/app/svgs/CalculatorIcon";
import UsersIcon from "@/app/svgs/UsersIcon";
import UnevenBalanceIcon from "@/app/svgs/UnevenBalcnaceIcon";
import SaveIcon from "@/app/svgs/SaveIcon";
import { ReactElement, isValidElement, cloneElement } from "react";
import { useTranslations } from "next-intl";

const Feature = ({
  icon,
  title,
  description,
}: {
  icon: ReactElement<{ className?: string }>;
  title: string;
  description: string;
}) => {
  // Clone the icon element and pass common props
  const iconWithProps = isValidElement(icon)
    ? cloneElement(icon, {
        className: "w-6 h-6 2xl:w-8 2xl:h-8",
      })
    : icon;

  return (
    <div className="flex flex-col space-y-4 text-center md:text-left h-full">
      <div className="flex space-x-4 justify-center lg:justify-start">
        {iconWithProps}
        <h3 className="subtitle">{title}</h3>
      </div>
      <p className="text-base 2xl:text-lg">{description}</p>
    </div>
  );
};

const Features = () => {
  const t = useTranslations();
  return (
    <div className="w-full flex-col items-center">
      <SectionTitle text={t("homepage.whatItDoes")} />

      <div className="flex flex-col items-center md:grid md:grid-cols-2 gap-12 max-w-sm md:max-w-5xl mx-auto px-4">
        <Feature
          icon={<CalculatorIcon />}
          title={t("homepage.smartCalculations")}
          description={t("homepage.requireMinimalTransactionsAmount")}
        />
        <Feature
          icon={<SaveIcon color="var(--accent)" />}
          title={t("homepage.savingTickets")}
          description={t("homepage.saveYourTickets")}
        />
        <Feature
          icon={<UnevenBalanceIcon />}
          title={t("homepage.unevenConsumption")}
          description={t("homepage.specifyConsumers")}
        />

        <Feature
          icon={<UsersIcon />}
          title={t("homepage.multiplePayers")}
          description={t("homepage.multiplePeoplePaying")}
        />
      </div>
    </div>
  );
};

export default Features;
