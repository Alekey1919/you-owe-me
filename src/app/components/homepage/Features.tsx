import SectionTitle from "./SectionTitle";
import CalculatorIcon from "@/app/svgs/CalculatorIcon";
import UsersIcon from "@/app/svgs/UsersIcon";
import UnevenBalanceIcon from "@/app/svgs/UnevenBalcnaceIcon";
import SaveIcon from "@/app/svgs/SaveIcon";
import { ReactElement, isValidElement, cloneElement } from "react";

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
  return (
    <div className="w-full flex-col items-center">
      <SectionTitle text="What it handles" />

      <div className="flex flex-col items-center md:grid md:grid-cols-2 gap-12 max-w-sm md:max-w-5xl mx-auto px-4">
        <Feature
          icon={<CalculatorIcon />}
          title="Smart calculations"
          description="Our algorithm optimizes transfers to minimize the number of
        transactions between participants"
        />
        <Feature
          icon={<SaveIcon color="var(--accent)" />}
          title="Saving tickets"
          description="Save your expense splits to access them later or share with others"
        />
        <Feature
          icon={<UnevenBalanceIcon />}
          title="Uneven consumption"
          description="Specify exactly who consumed each item rather than splitting
        everything equally"
        />

        <Feature
          icon={<UsersIcon />}
          title="Multiple payers"
          description="Handle situations where multiple people contributed to paying for a
            single expense"
        />
      </div>
    </div>
  );
};

export default Features;
