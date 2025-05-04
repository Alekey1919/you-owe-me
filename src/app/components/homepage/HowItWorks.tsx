import RightArrow from "@/app/svgs/RightArrow";
import SectionTitle from "./SectionTitle";

const Card = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 max-w-xs 2xl:max-w-sm">
      <h3 className="font-medium subtitle">{title}</h3>
      <p className="text-base 2xl:text-lg">{description}</p>
    </div>
  );
};

const Arrow = () => {
  return (
    <div className="shrink-0 flex items-center justify-center">
      <RightArrow className="rotate-90 md:rotate-0 w-6 h-6 2xl:w-9 2xl:h-9" />
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="w-full flex flex-col py-16">
      <SectionTitle text="How it works" />

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 2xl:gap-12 mx-auto px-4">
        <Card
          title="Add participants"
          description="Enter the names of everyone involved in splitting the expenses"
        />
        <Arrow />
        <Card
          title="Record expenses"
          description=" Enter what was purchased, how much it cost, who paid, and who
          consumed it"
        />
        <Arrow />
        <Card
          title="Calculate & share"
          description="Get optimized transfer suggestions that minimize the number of transactions needed"
        />
      </div>
    </div>
  );
};

export default HowItWorks;
