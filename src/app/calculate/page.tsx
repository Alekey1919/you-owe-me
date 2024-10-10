"use client";
import { useState } from "react";
import NewParticipant from "./NewParticipant";
import ParticipantList from "./ParticipantList";

const PARTICIPANTS = ["Alekey", "Crisol", "Octi", "Anto", "Mateo", "Cimi"];

export enum AnimationStatesEnum {
  Overlap,
  Move,
  End,
}

const Page = () => {
  const [participants, setParticipants] = useState(PARTICIPANTS);
  const [animationState, setAnimationState] = useState(AnimationStatesEnum.End);

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

    handleAnimation();
  };

  const handleAnimation = () => {
    setAnimationState(AnimationStatesEnum.Overlap);

    setTimeout(() => {
      setAnimationState(AnimationStatesEnum.Move);
    }, 0);

    setTimeout(() => {
      setAnimationState(AnimationStatesEnum.End);
    }, 1000);
  };

  return (
    <div className="min-h-screen min-w-[100vh] flex justify-center ">
      {/* <button className="bg-secondary rounded-lg shadow-lg border-none font-semibold text-primary hover:scale-105 transition-all px-4 py-2">
        Create new ticket
      </button> */}
      <div className="flex flex-col space-y-8">
        <span className="font-medium text-xl">Participants:</span>
        <div className="flex flex-col space-y-2 relative">
          <NewParticipant handleAdd={handleAdd} />
          <ParticipantList
            participants={participants}
            removeParticipant={removeParticipant}
            animationState={animationState}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
