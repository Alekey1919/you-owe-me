import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  text,
  onClick,
  disabled,
  styles = "",
}: {
  text: string | ReactNode;
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
      {text}
    </button>
  );
};

export default Button;
