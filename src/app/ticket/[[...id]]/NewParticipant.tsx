import useCalculationContext from "@/app/contexts/calculationContext";
import CrossIcon from "@/app/svgs/CrossIcon";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const NewParticipant = ({
  handleAdd,
}: {
  handleAdd: (name: string) => void;
}) => {
  const [name, setName] = useState("");
  const t = useTranslations();

  const {
    ticketData: { participants },
  } = useCalculationContext();

  const handleClick = () => {
    if (!name) return;

    if (participants.includes(name)) {
      return toast.error(t("ticket.participantAlreadyExists"));
    }

    handleAdd(name);
    setName("");
  };

  return (
    <div className="box flex justify-between participant">
      <input
        type="text"
        placeholder="John Doe"
        className="bg-transparent placeholder:text-background placeholder:opacity-50 focus:outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className={twMerge(
          "transition-opacity",
          name ? "cursor-pointer" : "opacity-25 cursor-not-allowed",
        )}
        onClick={handleClick}
      >
        <CrossIcon className="w-5 h-5 rotate-45" />
      </button>
    </div>
  );
};

export default NewParticipant;
