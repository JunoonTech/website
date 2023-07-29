import { useEffect, useState } from "react";

const AnimateNum = ({ value }) => {
  const [toShow, setToShow] = useState(0);
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
      const progress = Math.min((ts - startTime) / 2000, 1);
      setToShow(Math.floor(progress * (value - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  return toShow;
};

export default AnimateNum;
