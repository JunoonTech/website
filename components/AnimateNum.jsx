"use client";
import useOnScreen from "@/hooks/useOnScreen";
import { useEffect, useState, useRef } from "react";

const AnimateNum = ({ value, timeToAnimate = 1000 }) => {
  const ref = useRef();
  const onScreen = useOnScreen(ref);
  const [toShow, setToShow] = useState(0);

  useEffect(() => {
    if (!(onScreen && typeof value === "number")) {
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
  }, [value, onScreen]);

  return (
    <span className="number" ref={ref}>
      {toShow}
    </span>
  );
};

export default AnimateNum;
