import React from "react";
import { twMerge } from "tailwind-merge";

const SectionTitle = ({ text, styles }: { text: string; styles?: string }) => {
  return (
    <h2
      className={twMerge(
        "title font-bold text-center mb-12 md:mb-20 2xl:mb-28",
        styles
      )}
    >
      {text}
    </h2>
  );
};

export default SectionTitle;
