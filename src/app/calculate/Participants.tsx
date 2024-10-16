import React, { useState } from "react";
import NewParticipant from "./NewParticipant";
import ParticipantList from "./ParticipantList";
import useCalculationContext from "./CalculationContext";
import { AnimationStatesEnum } from "../hooks/useListAnimations";

const Participants = () => {
  const { participants, setParticipants } = useCalculationContext();
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
  );
};

export default Participants;
