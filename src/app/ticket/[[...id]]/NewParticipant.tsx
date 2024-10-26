import React, { useState } from "react";
import Cross from "@public/images/cross.svg";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const NewParticipant = ({
  handleAdd,
}: {
  handleAdd: (name: string) => void;
}) => {
  const [name, setName] = useState("");

  const handleClick = () => {
    if (!name) return;

    handleAdd(name);
    setName("");
  };

  return (
    <div className="box flex justify-between participant">
      <input
        type="text"
        placeholder="Harry Potter"
        className="bg-transparent placeholder:text-primary placeholder:opacity-50 focus:outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className={twMerge(
          "transition-opacity",
          name ? "cursor-pointer" : "opacity-25"
        )}
        onClick={handleClick}
      >
        <Image src={Cross} alt="Close" className="w-5 rotate-45" />
      </button>
    </div>
  );
};

export default NewParticipant;
