import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const TwoStatesButton = ({
  text1,
  text2,
  showSecondText,
  onClick,
  disabled,
  styles = "",
}: {
  text1: string | ReactNode;
  text2: string | ReactNode;
  showSecondText: boolean;
  onClick?: () => void;
  disabled?: boolean;
  styles?: string;
}) => {
  return (
    <button
      className={twMerge(
        "button relative group overflow-hidden outline mouse:outline-1 mouse:outline-accent mouse:outline-offset-[3px]",
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:outline-offset-0 transition-all duration-300", // Disabled only applies styles because we need the toast to be triggered on the onClick
        styles
      )}
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
    </button>
  );
};

export default TwoStatesButton;
