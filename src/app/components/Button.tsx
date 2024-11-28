import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  text,
  onClick,
  disabled,
  styles = "",
  invertColors,
}: {
  text: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  styles?: string;
  invertColors?: boolean;
}) => {
  return (
    <button
      className={twMerge(
        "button relative group overflow-hidden mouse:outline mouse:outline-[1.5px] mouse:outline-offset-[3px]",
        invertColors
          ? "!text-accent !bg-background mouse:outline-background"
          : "mouse:outline-accent",
        disabled
          ? "opacity-30 cursor-not-allowed !outline-offset-0"
          : "hover:outline-offset-0 transition-all duration-300", // Disabled only applies styles because we need the toast to be triggered on the onClick
        styles
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
