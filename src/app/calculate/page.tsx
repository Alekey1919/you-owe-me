"use client";
import { useState } from "react";
import Image from "next/image";
import Cross from "@public/images/cross.svg";
import NewParticipant from "./NewParticipant";

const PARTICIPANTS = ["Alekey", "Crisol", "Octi", "Anto", "Mateo", "Cimi"];

const Page = () => {
  const [participants, setParticipants] = useState(PARTICIPANTS);

  const removeParticipant = (index: number) => {
    setParticipants((curr) => {
      const _curr = [...curr];

      _curr.splice(index, 1);

      return _curr;
    });
  };

  const handleAdd = (participant: string) => {
    setParticipants((curr) => {
      return [participant, ...curr];
    });
  };

  return (
    <div className="min-h-screen min-w-[100vh] flex items-center justify-center">
      {/* <button className="bg-secondary rounded-lg shadow-lg border-none font-semibold text-primary hover:scale-105 transition-all px-4 py-2">
        Create new ticket
      </button> */}

      <div className="flex flex-col space-y-8">
        <span className="font-medium text-xl">Participants:</span>
        <div className="flex flex-col space-y-2">
          <NewParticipant handleAdd={handleAdd} />
          {participants.map((participant, index) => {
            return (
              <div className="flex box justify-between space-x-8" key={index}>
                <span className="">{participant}</span>{" "}
                <button onClick={() => removeParticipant(index)}>
                  <Image src={Cross} alt="Close" className="w-5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
