import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimationStatesEnum } from "./page";

const listItemsSpace = 8;

const useListAnimations = ({
  animationState,
  removeParticipant,
}: {
  animationState: AnimationStatesEnum;
  removeParticipant: (index: number) => void;
}) => {
  const [boxHeight, setBoxHeight] = useState(0);
  const [deletedIndex, setDeletedIndex] = useState<number>();

  const performingAnimation = useMemo(() => {
    return (
      animationState !== AnimationStatesEnum.End || deletedIndex !== undefined
    );
  }, [animationState, deletedIndex]);

  const getBoxAnimationStyles = (index: number) => {
    const styles = { img: {}, container: {} };

    if (deletedIndex !== undefined) {
      if (index > deletedIndex) {
        return {
          container: {
            transition: "transform 500ms",
            transform: `translateY(-${boxHeight + listItemsSpace}px)`,
          },
        };
      } else if (index === deletedIndex) {
        return {
          container: {
            transition: "transform 500ms, opacity 1s",
            transform: `translateX(calc(-100% - ${listItemsSpace}px))`,
            opacity: 0,
          },
        };
      }
    }

    if (index === 0) {
      if (animationState === AnimationStatesEnum.Overlap) {
        styles.img = { transform: "rotate(45deg)" };
      } else if (animationState >= AnimationStatesEnum.Move) {
        styles.img = {
          transition: "transform 500ms",
          transform: "rotate(0deg)",
        };
      }
    }

    return styles;
  };

  const listContainerStyles = useMemo(() => {
    if (animationState < AnimationStatesEnum.Move) {
      return { transform: `translateY(-${boxHeight}px)` };
    }

    if (animationState >= AnimationStatesEnum.Move) {
      return { transform: "translateY(0)", transition: "transform 500ms" };
    }
  }, [animationState, boxHeight]);

  const getBoxHeigh = useCallback(() => {
    const participant = document.getElementsByClassName("participant")[0];

    if (!participant) return;

    const { height } = getComputedStyle(participant);

    setBoxHeight(parseInt(height));
  }, []);

  const handleRemoveAnimation = (index: number) => {
    setDeletedIndex(index);

    setTimeout(() => {
      removeParticipant(index);

      setDeletedIndex(undefined);
    }, 1000);
  };

  useEffect(() => {
    getBoxHeigh();

    window.addEventListener("resize", getBoxHeigh);

    return () => window.removeEventListener("resize", getBoxHeigh);
  }, [getBoxHeigh]);

  return {
    listContainerStyles,
    getBoxAnimationStyles,
    handleRemoveAnimation,
    performingAnimation,
  };
};

export default useListAnimations;
