import useCalculationContext from "@app/contexts/calculationContext";
import Participant from "./Participant";
import useListAnimations, {
  AnimationStatesEnum,
} from "@app/hooks/useListAnimations";
import { useMemo } from "react";

const ParticipantList = ({
  removeParticipant,
  animationState,
}: {
  removeParticipant: (index: number) => void;
  animationState: AnimationStatesEnum;
}) => {
  const {
    ticketData: { participants, expenses },
  } = useCalculationContext();

  // Participants that are part of at least one expense cannot be removed
  const activeParticipants = useMemo(() => {
    return expenses.reduce((acc: string[], expense) => {
      // Get keys from `payedAmounts` and `consumers`
      const payers = Object.keys(expense.payedAmounts);
      const consumers = expense.consumers;

      // Merge and filter unique values
      return Array.from(new Set([...acc, ...payers, ...consumers]));
    }, []);
  }, [expenses]);

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
            disabled={
              performingAnimation || activeParticipants.includes(participant)
            }
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ParticipantList;
