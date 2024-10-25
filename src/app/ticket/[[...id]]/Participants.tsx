import React, { useMemo, useState } from "react";
import NewParticipant from "./NewParticipant";
import ParticipantList from "./ParticipantList";
import useCalculationContext from "@app/contexts/calculationContext";
import { AnimationStatesEnum } from "@app/hooks/useListAnimations";
import { twMerge } from "tailwind-merge";

const Participants = () => {
  const { setTicketData } = useCalculationContext();
  const [animationState, setAnimationState] = useState(AnimationStatesEnum.End);

  const { lgScreen, isLeftSelected } = useCalculationContext();

  const removeParticipant = (index: number) => {
    setTicketData((curr) => {
      const _curr = JSON.parse(JSON.stringify(curr));

      _curr.participants.splice(index, 1);

      return _curr;
    });
  };

  const handleAdd = (participant: string) => {
    setTicketData((curr) => {
      const _curr = JSON.parse(JSON.stringify(curr));

      _curr.participants.unshift(participant);

      return _curr;
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
          removeParticipant={removeParticipant}
          animationState={animationState}
        />
      </div>
    </div>
  );
};

export default Participants;
