import { AnimationStatesEnum } from "./page";
import { twMerge } from "tailwind-merge";
import Participant from "./Participant";

const ParticipantList = ({
  participants,
  removeParticipant,
  animationState,
}: {
  participants: string[];
  removeParticipant: (index: number) => void;
  animationState: AnimationStatesEnum;
}) => {
  if (!participants.length) return <></>;

  return (
    <div
      className={twMerge(
        "flex flex-col space-y-2 relative",
        animationState < AnimationStatesEnum.Move && "-translate-y-[56px]",
        animationState >= AnimationStatesEnum.Move &&
          "transition-transform duration-500 translate-y-0"
      )}
    >
      {participants.map((participant, index) => {
        return (
          <Participant
            name={participant}
            onClick={() => removeParticipant(index)}
            animationState={index === 0 ? animationState : undefined}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ParticipantList;
