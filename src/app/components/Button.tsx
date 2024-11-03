import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  text,
  onClick,
  disabled,
}: {
  text: string | ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className="button relative group overflow-hidden"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span
        className={twMerge(
          "touch:hidden absolute right-0 top-0 inline-block h-4 w-4 rounded transition-all bg-[#294ba0] duration-500 ease-in-out",
          disabled ? "bg-gray-950" : "group-hover:-mr-4 group-hover:-mt-4"
        )}
      >
        <span className="absolute right-0 top-0 h-5 w-5 -translate-y-1/2 translate-x-1/2 rotate-45 bg-white brightness-100" />
      </span>
      {text}
    </button>
  );
};

export default Button;
