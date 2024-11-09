import Cross from "@public/images/cross.svg"; // adjust the import path accordingly
import Image from "next/image"; // adjust if using a different method for images
import { CSSProperties } from "react";
import toast from "react-hot-toast";
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
  const showToast = () => {
    toast.error("Participant is part of at least one ticket");
  };

  return (
    <div
      className="flex box justify-between space-x-8"
      style={styles?.container}
    >
      <span>{name}</span>
      <button onClick={disabled ? showToast : onRemove}>
        <Image
          src={Cross}
          alt="Close"
          style={styles?.img}
          className={twMerge("w-5", disabled && "opacity-25")}
        />
      </button>
    </div>
  );
};

export default Participant;
