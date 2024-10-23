import { useCallback, useEffect, useMemo, useState } from "react";
import useCalculationContext from "../contexts/calculationContext";

export enum AnimationStatesEnum {
  Overlap,
  Move,
  End,
}

// Space y in list, used to calculate the correct translateY value for all the elements that are below the one being removed
const listItemsSpace = 8;

const useListAnimations = ({
  animationState,
  removeListItem,
  boxClassName,
}: {
  animationState?: AnimationStatesEnum;
  removeListItem: (index: number) => void;
  boxClassName: "participant" | "expense";
}) => {
  const [boxHeight, setBoxHeight] = useState(0);
  const [deletedIndex, setDeletedIndex] = useState<number>();
  const { lgScreen } = useCalculationContext();

  const performingAnimation = useMemo(() => {
    return (
      (animationState !== undefined &&
        animationState !== AnimationStatesEnum.End) ||
      deletedIndex !== undefined
    );
  }, [animationState, deletedIndex]);

  const getBoxAnimationStyles = (index: number) => {
    const styles = { img: {}, container: {} };

    // Removing an item from the list
    if (deletedIndex !== undefined) {
      // The once being removed moves to the left
      if (index === deletedIndex) {
        return {
          container: {
            transition: "transform 500ms, opacity 1s",
            transform: `translate${
              lgScreen ? "X" : "Y"
            }(calc(-100% - ${listItemsSpace}px))`,
            opacity: 0,
          },
        };
      } else if (index > deletedIndex) {
        // All the ones below it move up
        return {
          container: {
            transition: "transform 500ms",
            transform: `translateY(-${boxHeight + listItemsSpace}px)`,
          },
        };
      }
    }

    // Adding a new element to the list
    // The first element takes the space of the input, and then moves down with the whole list
    if (index === 0 && animationState !== undefined) {
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

  // When adding a new element to the list, the whole list moves down making room fot the new item coming from the top
  const listContainerStyles = useMemo(() => {
    if (animationState === undefined) return;

    if (animationState < AnimationStatesEnum.Move) {
      return { transform: `translateY(-${boxHeight}px)` };
    }

    if (animationState >= AnimationStatesEnum.Move) {
      return { transform: "translateY(0)", transition: "transform 500ms" };
    }
  }, [animationState, boxHeight]);

  // Saving the height of the list item so we can perform the correct translateY when removing one
  const getBoxHeigh = useCallback(() => {
    const participant = document.getElementsByClassName(boxClassName)[0];

    if (!participant) return;

    const { height } = getComputedStyle(participant);

    setBoxHeight(parseInt(height));
  }, [boxClassName]);

  // The deleteIndex will take care of the animations and after that happens we remove the item from the state
  const handleRemoveAnimation = (index: number) => {
    setDeletedIndex(index);

    setTimeout(() => {
      removeListItem(index);

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
