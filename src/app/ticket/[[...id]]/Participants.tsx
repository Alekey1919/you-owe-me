import React, { useMemo, useState } from "react";
import NewParticipant from "./NewParticipant";
import ParticipantList from "./ParticipantList";
import useCalculationContext from "@app/contexts/calculationContext";
import { AnimationStatesEnum } from "@app/hooks/useListAnimations";
import { twMerge } from "tailwind-merge";

const Participants = () => {
  const { participants, setParticipants } = useCalculationContext();
  const [animationState, setAnimationState] = useState(AnimationStatesEnum.End);

  const { lgScreen, isLeftSelected } = useCalculationContext();

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

  const isSelectedInMobile = useMemo(() => {
    if (lgScreen) return;

    return isLeftSelected;
  }, [isLeftSelected, lgScreen]);

  return (
    <div
      className={twMerge(
        "flex flex-col lg:space-y-8 w-full shrink-0 lg:w-[unset] transition-translate duration-300",
        isSelectedInMobile === false && "-translate-x-full"
      )}
    >
      <span className="subtitle text-center hidden lg:block">
        Participants:
      </span>
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
