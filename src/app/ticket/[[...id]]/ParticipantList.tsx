import Participant from "./Participant";
import useListAnimations, {
  AnimationStatesEnum,
} from "@app/hooks/useListAnimations";

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
    removeListItem: removeParticipant,
    boxClassName: "participant",
  });

  if (!participants.length) return <></>;

  return (
    <div
      className="flex flex-col space-y-2 relative lg:pb-10"
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
