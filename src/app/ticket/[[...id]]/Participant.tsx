import CrossIcon from "@/app/svgs/CrossIcon";
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
      <button onClick={disabled ? showToast : onRemove} style={styles?.img}>
        <CrossIcon className={twMerge("w-5 h-5", disabled && "opacity-25")} />
      </button>
    </div>
  );
};

export default Participant;
