import { twMerge } from "tailwind-merge";
import Participant from "./Participant";
import useListAnimations from "./useListAnimations";
import { AnimationStatesEnum } from "./Participants";

const ParticipantList = ({
  participants,
  removeParticipant,
  animationState,
}: {
  participants: string[];
  removeParticipant: (index: number) => void;
  animationState: AnimationStatesEnum;
}) => {
  const {
    listContainerStyles,
    getBoxAnimationStyles,
    handleRemoveAnimation,
    performingAnimation,
  } = useListAnimations({
    animationState,
    removeParticipant: removeParticipant,
  });

  if (!participants.length) return <></>;

  return (
    <div
      className={twMerge("flex flex-col space-y-2 relative")}
      style={listContainerStyles}
    >
      {participants.map((participant, index) => {
        return (
          <Participant
            name={participant}
            onRemove={() => handleRemoveAnimation(index)}
            styles={getBoxAnimationStyles(index)}
            disabled={performingAnimation}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ParticipantList;
