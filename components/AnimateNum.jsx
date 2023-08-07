import { useEffect, useState } from "react";

const AnimateNum = ({ value, timeToAnimate }) => {
  const [toShow, setToShow] = useState(0);
  if (!timeToAnimate) {
    timeToAnimate = 1000;
  }
  useEffect(() => {
    if (!(typeof value === "number")) {
      return;
    }
    let startTime;
    const start = toShow;

    const step = (ts) => {
      if (!startTime) {
        startTime = ts;
      }
      const progress = Math.min((ts - startTime) / timeToAnimate, 1);
      setToShow(Math.floor(progress * (value - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return toShow;
};

export default AnimateNum;
