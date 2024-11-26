import { twMerge } from "tailwind-merge";
import Spinner from "../svgs/Spinner";

const TextWithSpinner = ({
  text,
  isLoading,
  spinnerColor,
}: {
  text: string;
  isLoading: boolean;
  spinnerColor?: string;
}) => {
  return (
    <>
      <span
        className={twMerge(
          "transition-opacity duration-300",
          isLoading && "opacity-0"
        )}
      >
        {text}
      </span>

      <Spinner
        className={twMerge(
          "w-8 absolute left-0 right-0 bottom-0 top-0 m-auto mix-blend-difference opacity-0 transition-opacity duration-300",
          isLoading && "opacity-100"
        )}
        color={spinnerColor}
      />
    </>
  );
};

export default TextWithSpinner;
