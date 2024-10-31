// Smooth scroll to element with consistent duration.
// This makes sure it takes the same time to a scroll into view an element that is just a few pixels away and one that is far away
export const smoothScrollTo = (element: HTMLElement, duration = 500) => {
  const spacing = 50;
  const targetPosition =
    element.getBoundingClientRect().top + window.scrollY - spacing;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Ease function for a smooth scroll
    const ease = progress * (2 - progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
};
