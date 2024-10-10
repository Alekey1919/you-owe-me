import Cross from "@public/images/cross.svg"; // adjust the import path accordingly
import Image from "next/image"; // adjust if using a different method for images
import { twMerge } from "tailwind-merge";
import { AnimationStatesEnum } from "./page";

const Participant = ({
  name,
  onClick,
  animationState,
}: {
  name: string;
  onClick: () => void;
  animationState?: AnimationStatesEnum;
}) => {
  return (
    <div className="flex box justify-between space-x-8">
      <span>{name}</span>
      <button onClick={onClick}>
        <Image
          src={Cross}
          alt="Close"
          className={twMerge(
            "w-5",
            animationState === AnimationStatesEnum.Overlap && "rotate-45",
            animationState &&
              animationState >= AnimationStatesEnum.Move &&
              "transition-transform duration-500 rotate-0"
          )}
        />
      </button>
    </div>
  );
};

export default Participant;
