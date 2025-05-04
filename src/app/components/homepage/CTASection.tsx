import Link from "next/link";
import Button from "../Button";
import SectionTitle from "./SectionTitle";

const CTASection = () => {
  return (
    <div className="w-full py-16 flex flex-col items-center">
      <SectionTitle
        text="Ready to split your expenses?"
        styles="!mb-8 lg:!mb-10 2xl:!mb-14"
      />
      <p className="text-center max-w-md text-lg mb-8">
        Stop calculating who owes what on paper or spreadsheets. Try our simple
        solution!
      </p>
      <Link href="/ticket">
        <Button text="Get started now" styles="px-8 py-3 text-lg" />
      </Link>
    </div>
  );
};

export default CTASection;
