import React from "react";
import { ISVGProps } from "../types/propTypes";

const EnglishIcon = ({ className, onClick }: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 512 420.16"
      className={className}
      onClick={onClick}
    >
      <path
        fillRule="nonzero"
        fill="var(--accent)"
        d="M74.32 0h363.36C478.55 0 512 33.46 512 74.32v271.53c0 40.81-33.5 74.31-74.32 74.31H74.32C33.44 420.16 0 386.69 0 345.85V74.32C0 33.41 33.41 0 74.32 0zm148.91 226.79h-43.69v16.61h53.53v34.95h-97.22V141.81h96.12l-5.46 34.96h-46.97v18.35h43.69v31.67zm111.85 51.56c-3.99-5.79-36.19-58.98-36.48-58.98v58.98h-43.69V141.81h41.06c3.94 5.72 35.42 58.99 36.49 58.99v-58.99h43.69v136.54h-41.07zm102.6-242.42H74.32c-21.08 0-38.39 17.31-38.39 38.39v271.53c0 21.1 17.25 38.39 38.39 38.39h363.36c21.16 0 38.39-17.24 38.39-38.39V74.32c0-21.09-17.29-38.39-38.39-38.39z"
      />
    </svg>
  );
};

export default EnglishIcon;
