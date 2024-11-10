import Image from "next/image";
import Spinner from "@public/images/spinner.svg";
import { twMerge } from "tailwind-merge";

const TextWithSpinner = ({
  text,
  isLoading,
}: {
  text: string;
  isLoading: boolean;
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

      <Image
        src={Spinner}
        alt="Spinner"
        className={twMerge(
          "w-8 absolute left-0 right-0 bottom-0 top-0 m-auto mix-blend-difference opacity-0 transition-opacity duration-300",
          isLoading && "opacity-100"
        )}
      />
    </>
  );
};

export default TextWithSpinner;
