import React from "react";
import { ISVGProps } from "../types/propTypes";

const SearchIcon = ({
  className,
  onClick,
  fill,
}: ISVGProps & { fill: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M15 15L21 21"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
        stroke="var(--accent)"
        strokeWidth="2"
      />
    </svg>
  );
};

export default SearchIcon;
