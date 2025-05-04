import Link from "next/link";
import Button from "../Button";
import SectionTitle from "./SectionTitle";
import { useTranslations } from "next-intl";

const CTASection = () => {
  const t = useTranslations();
  return (
    <div className="w-full py-16 flex flex-col items-center">
      <SectionTitle
        text={t("homepage.readyToSplitYourExpenses")}
        styles="!mb-8 lg:!mb-10 2xl:!mb-14"
      />
      <p className="text-center max-w-md text-lg mb-8">
        {t("homepage.stopOldCalculations")}
      </p>
      <Link href="/ticket">
        <Button text={t("homepage.getStartedNow")} styles="px-8 py-3 text-lg" />
      </Link>
    </div>
  );
};

export default CTASection;
