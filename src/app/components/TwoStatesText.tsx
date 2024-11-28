import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const TwoStatesText = ({
  text1,
  text2,
  showSecondText,
  styles = "",
  onClick,
}: {
  text1: string | ReactNode;
  text2: string | ReactNode;
  showSecondText: boolean;
  styles?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={twMerge("w-full h-full relative overflow-hidden", styles)}
      onClick={onClick}
    >
      <span className="invisible">.</span>
      <span
        className={twMerge(
          "absolute-full flex items-center justify-center transition-transform duration-300",
          showSecondText && "translate-y-full"
        )}
      >
        {text1}
      </span>
      <span
        className={twMerge(
          "absolute-full flex items-center justify-center -translate-y-full transition-transform duration-300",
          showSecondText && "translate-y-0"
        )}
      >
        {text2}
      </span>
    </div>
  );
};

export default TwoStatesText;
