import Cross from "@public/images/cross.svg"; // adjust the import path accordingly
import Image from "next/image"; // adjust if using a different method for images
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

const Participant = ({
  name,
  onRemove,
  styles,
  disabled,
}: {
  name: string;
  onRemove: () => void;
  styles?: { img?: CSSProperties; container?: CSSProperties };
  disabled: boolean;
}) => {
  return (
    <div
      className="flex box justify-between space-x-8 participant"
      style={styles?.container}
    >
      <span>{name}</span>
      <button onClick={onRemove} disabled={disabled}>
        <Image
          src={Cross}
          alt="Close"
          style={styles?.img}
          className={twMerge("w-5", disabled && "cursor-not-allowed")}
        />
      </button>
    </div>
  );
};

export default Participant;
